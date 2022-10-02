import { pool } from "../services/db";
import { encrypt, generateToken } from "../utils/helpers";

export class User {
    id: number | undefined;
    username: string;
    password: string;
    created_at: string | undefined;
    updated_at: string | undefined;
    private registered: boolean;
    private accessToken: string | undefined;

    public constructor(_username: string, _password: string, _id?: number,  _created_at?: string, _updated_at?: string) {
        this.id = _id;
        this.username = _username;
        this.password = _password;
        this.created_at = _created_at;
        this.updated_at = _updated_at;
        if(this.id) {
            this.registered = true;
        } 
        else {
            this.registered = false;
        }
    }

    public getID() {
        return this.id;
    }

    public getPassword() : string {
        return this.password;
    }

    public async encryptPassword() : Promise<User> {
        this.password = await encrypt(this.password);
        return this;
    }

    public async generateAccessToken() : Promise<User> {
        var query : string = "INSERT INTO access_tokens(user_id, token) VALUES($1, $2)";
        this.accessToken = generateToken();
        await pool.query(query, [this.id, this.accessToken]).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        return this;
    }

    public getAccessToken() : string | undefined {
        return this.accessToken;
    }

    public async save() : Promise<User> {
        var query : string = "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *";
        this.encryptPassword();
        await pool.query(query, [this.username, this.password]).then((res) => {
            this.id = res.rows[0].id;
            this.created_at = res.rows[0].created_at;
            this.updated_at = res.rows[0].updated_at;
            this.registered = true;
        }).catch((err) => {
            console.log(err);
        });

        return this;
    }

    public isSafe() : User {
        if(this.id && this.username && this.password && this.created_at && this.updated_at) {
            return this;
        }
        else {
            throw new Error("User has undefined properties.");
        }
    }

    public isRegistered() : boolean {
        return this.registered;
    }
}