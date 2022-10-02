import { Axios, AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { Flight } from '../models/Flight';
import { FlightInterface } from '../models/FlightInterface';
import { Reservation } from '../models/Reservation';
import { doesExists, fetchAll, fetchOne } from '../services/db';
import { getCall } from '../utils/connection';


export async function placeReservation(req: Request, res: Response, next: NextFunction) : Promise<Response> {
    var res_code : number;
    var res_message : string | object;
    var reserved : boolean = false;

    console.log("[INFO] Requested GET /flights/".concat(req.params.id).concat('/reserve'));
    
    try { 
        var result : AxiosResponse = await getCall("/flights/".concat(req.params.id));

        var obj : FlightInterface = result.data;
        var flight : Flight = new Flight(obj.id);
        if(!req.body.row && !req.body.seat) {
            res_code = 400;
            res_message = "Missing fields.";
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

    var reservations : Reservation[] = await fetchAll("reservations", "user_id", req.user.id as number) as Reservation[]; 
    return res.status(200).json({
        data: reservations
    });
}

export async function getReservation(req: Request, res: Response, next: NextFunction)  {
    console.log("[INFO] Requested GET /user/reservations/".concat(req.params.id));

    if(await doesExists("reservations", "id", req.params.id)) {
        var rez : Reservation = await fetchOne("reservations", "id", req.params.id) as Reservation;
        return res.status(200).json({
            data : rez
        })
    }
    else {
        return res.status(400).json({
            data : "No such reservation exist."
        })
    }

}

export function cancelReservation(req: Request, res: Response, next: NextFunction) {
    // TODO : check reservation
    // TODO : soft delete reservation
}

export default {placeReservation, getReservation, getReservations, cancelReservation};