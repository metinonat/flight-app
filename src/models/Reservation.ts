export interface Reservation {
    id : number;
    user_id : number;
    flight_id : string;
    row : number;
    seat : string;
    created_at : Date;
    canceled_at : Date;
}