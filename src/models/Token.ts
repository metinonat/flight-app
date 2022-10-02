import { getDayDiff } from "../utils/helpers";

export interface TokenInterface {
    id: number;
    user_id: number;
    token: string;
    created_at: Date;
}

export class Token implements TokenInterface {
    id: number;
    user_id: number;
    token: string;
    created_at: Date;

    public constructor(_id:number, _user_id: number, _token: string, _created_at : Date) {
        this.id = _id;
        this.user_id = _user_id;
        this.token = _token;
        this.created_at = _created_at;
    }

    public getId() : number {
        return this.id;
    }

    public getUserId() : number {
        return this.user_id;
    }

    public getToken() : string {
        return this.token;
    }

    public getCreatedTime() : Date {
        return this.created_at;
    }

    public expired() : boolean {
        if(getDayDiff(this.created_at, new Date()) > 1) {
            return true;
        }  
        return false;
    }
}
