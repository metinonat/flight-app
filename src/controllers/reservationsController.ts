import { Request, Response, NextFunction } from 'express';


export function placeReservation(req: Request, res: Response, next: NextFunction) : Response {
    var res_code : number = 400;
    var res_message : string = ".";

    // TODO: Check flight is valid
    // TODO: check seat is available
    // TODO: reserve the seat

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