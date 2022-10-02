import { Request, Response, NextFunction } from 'express';
import { doesExists, pool } from '../services/db';
import { User } from '../models/User';
import { checkPass } from '../utils/helpers';


const register = async (req: Request, res: Response, next: NextFunction) : Promise<Response<any, Record<string, any>>> => {
    var err_code : number = 400;
    var err_message : string = "";

    console.log(req.body);

    if("username" in req.body &&
     "password" in req.body &&
     "confirm_password" in req.body) {
        if(await doesExists("users", "username", req.body.username)) {
            err_code = 400;
            err_message = "User is already exists. Try a different username.";
        }
        else {
            if(req.body.password === req.body.confirm_password) {
                var user : User = new User(req.body.username, req.body.password);
                await (await user.encryptPassword()).save();
                if(user.isRegistered()) {
                    return res.status(200).json({
                        data: "Registered successfully."
                    });
                }
                else {
                    return res.status(500).json({
                        data: "Fail to register. Please try again later."
                    });
                }
            }
            else {
                err_code = 400;
                err_message = "Passwords does not match."
            }
        }
    }
    else {
        err_code = 400;
        err_message = "Missing required field.";
    }
    return res.status(err_code).json({
        data: err_message
    })
}

const login = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>  => {
    var res_code : number = 400;
    var res_message : string = "";

    console.log(req.body);
    if("username" in req.body &&
     "password" in req.body) {
        var query = "SELECT * FROM users WHERE username = $1";
        // asign it to a user model
        var user : User;
        // Fetch the user
        await pool.query(query, [req.body.username]).then(async (res) => {
            if(res.rowCount == 1) {
                user = new User(res.rows[0].username,
                                res.rows[0].password,
                                res.rows[0].id,
                                res.rows[0].created_at,
                                res.rows[0].updated_at);
                if( await checkPass(req.body.password, user.getPassword()) ) {
                    var token : string = (await user.generateAccessToken()).getAccessToken() as string;
                    res_code = 200;
                    res_message = token;    
                }
                else {
                    res_code = 400;
                    res_message = "Incorrect username or password.";
                }
            }
            else {
                res_code = 400;
                res_message = "Incorrect username or password.";
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    else {
        res_code = 400;
        res_message = "Missing required field.";
    }
    return res.status(res_code).json({
        data: res_message
    })

}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    var res_code : number;
    var res_message : string;

    console.log(req.body);

    if(req.user) {
        if(await doesExists("access_tokens", "token", req.user.getAccessToken() as string)) {
            const query = `DELETE FROM access_tokens WHERE token = $1`;
            await pool.query(query, [req.user.getAccessToken() as string]).then((res) => {}).catch((err) => {
                console.log(err);
            })
            res_code = 200;
            res_message = "successfully logged out";
        }
        else {
            res_code = 401;
            res_message = "Not logged in."
        }
    }
    else {
        res_code = 401;
        res_message = "Not logged in."
    }

    return res.status(res_code).json({
        data: res_message
    });
}


export default {register, login, logout};