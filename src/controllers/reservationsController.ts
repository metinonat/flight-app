import { Axios, AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { Flight } from '../models/Flight';
import { FlightInterface } from '../models/FlightInterface';
import { Reservation } from '../models/Reservation';
import { doesExists, fetchAll, fetchOne, pool } from '../services/db';
import { getCall } from '../utils/connection';


export async function placeReservation(req: Request, res: Response, next: NextFunction) : Promise<Response> {
    var res_code : number;
    var res_message : string | object | string[];
    var reserved : boolean = false;
    const availableSeats = ['A', 'B', 'C', 'D', 'E', 'F'];
    console.log("[INFO] Requested GET /flights/".concat(req.params.id).concat('/reserve'));
    
    try { 
        var result : AxiosResponse = await getCall("/flights/".concat(req.params.id));

        var obj : FlightInterface = result.data;
        var flight : Flight = new Flight(obj.id);
        if(!req.body.row && !req.body.seat) {
            res_code = 400;
            res_message = "Missing fields.";
        }
        else if(req.body.row < 1 || req.body.seat > 30 || !(req.body.seat in availableSeats)) {
            res_code = 400;
            res_message = [
                "Row number must be between [1-30].",
                `Seat letter must be in ${availableSeats}`
            ];
        }
        // Check seat availablity
        else{
            if(await doesExists("reservations", "flight_id", flight.id) ) {
                var reservationList : Reservation[] = await fetchAll("reservations", "flight_id", flight.id) as Reservation[];
                for(let rez of reservationList) {
                    if ( rez.canceled_at != null ) {
                        continue;
                    }
                    else if( rez.row == req.body.row ) {
                        if( rez.seat == req.body.seat ) {
                            reserved = true;
                            break;
                        }
                    }
                }
            }
            if(!reserved) {
                var reservation : object = await flight.reserve(req.user.getID() as number, req.body.row, req.body.seat) as object;
                console.log(reservation);
                res_code = 200;
                res_message = reservation;
            }
            else {
                res_code = 400;
                res_message = "Seat is not available";
            }
        }
    }
    catch(e) {
        res_code = 500;
        if(e instanceof Error) {
            res_message = e.message;
        }
        else {
            res_message = "Unkown error";
        }
    }
    return res.status(res_code).json({
        data : res_message
    });
}

export async function getReservations(req: Request, res: Response, next: NextFunction)  {
    console.log("[INFO] Requested GET /user/reservations");
    var reservations : Reservation[] = [];
    if(!req.query) {
        reservations = await fetchAll("reservations", "user_id", req.user.id as number) as Reservation[]; 
    }
    else {
        var query : string = "SELECT * FROM reservations WHERE user_id = $1";
        var params : Array<string | number> = [req.user.id as number];
        if("canceled" in req.query) {
            if(req.query.canceled == "false") {
                query = query.concat(" and canceled_at IS null"); 
            }
            else if(req.query.canceled == "only") {
                query = query.concat(" and canceled_at IS NOT null");
            }
            else {
                // Default behaviour
            }
        }
        if("flight" in req.query) {
            query = query.concat(" and flight_id = $2");
            params.push(req.query.flight as string);
        }
        await pool.query(query, params).then((res) => {
            reservations = res.rows;
        }).catch((err) => {
            console.log(err);
        })
    }
    return res.status(200).json({
        data: reservations
    });
}

export async function getReservation(req: Request, res: Response, next: NextFunction)  {
    console.log("[INFO] Requested GET /user/reservations/".concat(req.params.id));

    if(await doesExists("reservations", "id", req.params.id)) {
        var rez : Reservation = await fetchOne("reservations", "id", req.params.id) as Reservation;
        if(rez.user_id != req.user.id) {
            return res.status(401)
        }
        return res.status(200).json({
            data : rez
        })
    }
    else {
        return res.status(401)
    }

}

export async function cancelReservation(req: Request, res: Response, next: NextFunction) {
    console.log("[INFO] Requested POST /user/reservations/".concat(req.params.id));

    if(await doesExists("reservations", "id", req.params.id)) {
        var rez : Reservation = await fetchOne("reservations", "id", req.params.id) as Reservation;
        // Does the authenticated user is allowed to access reservation
        if(rez.user_id != req.user.id) {
            return res.status(401);
        }
        // Does the reservation is already canceled.
        if(rez.canceled_at) {
            return res.status(400).json( {
                data: "Reservation is already canceled."
            })
        }
        var query : string = "UPDATE reservations SET canceled_at = NOW() WHERE id = $1 RETURNING *";
        await pool.query(query, [req.params.id]).then((res) => {
            rez = res.rows[0];
        }).catch((err) => {
            console.log(err);
        })
        return res.status(200).json({
            data : rez
        })
    }
    else {
        return res.status(401);
    }
}

export default {placeReservation, getReservation, getReservations, cancelReservation};