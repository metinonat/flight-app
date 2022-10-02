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

export function getReservations(req: Request, res: Response, next: NextFunction)  {
    // TODO : return all reservation by the user
}

export function getReservation(req: Request, res: Response, next: NextFunction)  {
    // TODO : return reservation 
}

export function cancelReservation(req: Request, res: Response, next: NextFunction) {
    // TODO : check reservation
    // TODO : soft delete reservation
}

export default {placeReservation};