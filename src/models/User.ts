import { pool } from "../services/db";
import { encrypt } from "../utils/helpers";

export class User {
    private id: number | undefined;
    private username: string;
    private password: string;
    private created_at: string | undefined;
    private updated_at: string | undefined;
    private registered: boolean;

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

    public encryptPassword() : User {
        this.password = encrypt(this.password);
        return this;
    }

    public async save() : Promise<User> {
        var query : string = "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *";
        this.encryptPassword();
        await pool.query(query, [this.username, this.password]).then((res) => {
            this.id = res.rows[0].id;
            this.created_at = res.rows[0].created_at;
            this.updated_at = res.rows[0].updated_at;
            this.registered = true;
            console.log(this.registered);
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