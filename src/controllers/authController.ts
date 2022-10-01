import { Request, Response, NextFunction } from 'express';
import { doesExists, pool } from '../services/db';
import { User } from '../models/User';


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
                await user.encryptPassword().save();
                if(user.isRegistered()) {
                    // TODO: Token implementation
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
    var err_code : number = 400;
    var err_message : string = "";

    console.log(req.body);
    if("username" in req.body &&
     "password" in req.body) {
        var query = "SELECT * FROM users WHERE username = $1";
        // asign it to a user model
        var user : User;
        // Fetch the user
        await pool.query(query, [req.body.username]).then((res) => {
            user = new User(res.rows[0].username,
                            res.rows[0].password,
                            res.rows[0].id,
                            res.rows[0].created_at,
                            res.rows[0].updated_at);
        }).catch((err) => {
            console.log(err);
        });
        // checkPass(req.body.password, )
        return res.status(200).json({
            data: "Logged in successfully."
        })
     }
    else {
        err_code = 400;
        err_message = "Missing required field.";
    }
    return res.status(err_code).json({
        data: err_message
    })

}


export default {register, login};