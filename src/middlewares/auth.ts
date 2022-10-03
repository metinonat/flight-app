import { Request, Response, NextFunction } from "express";
import { token } from "morgan";
import { Token, TokenInterface } from "../models/Token";
import { User } from "../models/User";
import { doesExists, fetchOne } from "../services/db";
import { redisClient } from "../utils/connection";

export async function authentication(req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization) {
        var token_string = req.headers.authorization.split(" ")[1];
        if(req.headers.authorization.split(" ")[0] != "Bearer") return res.status(401);
        var cache = await redisClient.get(token_string);
        if( cache && cache != "null") {
            // Store user data in the request to access through the app.
            console.log("User info fetched from cache.")
            req.user = JSON.parse(cache);
        }
        else if(await doesExists("access_tokens", "token", token_string)) {
            const obj : TokenInterface = await fetchOne("access_tokens", "token", token_string) as TokenInterface;
            const token_obj = new Token(obj.id, obj.user_id, obj.token, obj.created_at);
            // Check token validity
            if(token_obj.expired()) return res.status(401).json({ data: "Token expired."});
            var auth_user : User = await fetchOne("users", "id", token_obj.getUserId()) as User;
            // Store user data in request to access through the app.
            req.user = new User(auth_user.username, auth_user.password, auth_user.id, auth_user.created_at, auth_user.updated_at);
            // Cache user info
            redisClient.set(token_string, JSON.stringify(auth_user));
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