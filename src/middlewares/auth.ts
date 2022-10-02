import { Request, Response, NextFunction } from "express";
import { token } from "morgan";
import { Token, TokenInterface } from "../models/Token";
import { User } from "../models/User";
import { doesExists, fetchOne } from "../services/db";

export async function authentication(req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization) {
        var token_string = req.headers.authorization.split(" ")[1];
        if(req.headers.authorization.split(" ")[0] != "Bearer") return res.status(401);
        if(await doesExists("access_tokens", "token", token_string)) {
            const obj : TokenInterface = await fetchOne("access_tokens", "token", token_string) as TokenInterface;
            const token_obj = new Token(obj.id, obj.user_id, obj.token, obj.created_at);
            // Check token validity
            if(token_obj.expired()) return res.status(401).json({ data: "Token expired."});
            var auth_user : User = await fetchOne("users", "id", token_obj.getUserId()) as User;
            // Store user data in request to access through the app.
            req.user = auth_user;
        }
        else {
            return res.status(401);
        }
    }
    else {
        return res.status(401);
    }
    next()
}