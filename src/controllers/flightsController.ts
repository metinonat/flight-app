import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Flight } from "../utils/interfaces/flightInterface";
import schipholApp from "../configs/schiphol.config";
import { urlQueryBuilder, extractLinks, Dict } from "../utils/helpers";

const getFlights = async (req: Request, res: Response, next: NextFunction) => {
    var requestQuery : string = "";
    // Sorting by given column
    if("sort" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery, 
            "sort=,".concat(req.query.sort as string), req.query.order as string);
    }
    if("scheduleDate" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "scheduleDate=,".concat(req.query.scheduleDate as string));
    }
    if("scheduleTime" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "scheduleTime=,".concat(req.query.scheduleTime as string));
    }
    if("flightName" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "flightName=,".concat(req.query.flightName as string));
    }
    if("flightDirection" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "flightDirection=,".concat(req.query.flightDirection as string));
    }
    if("airline" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "airline=,".concat(req.query.airline as string));
    }
    if("airlineCode" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "airlineCode=,".concat(req.query.airlineCode as string));
    }
    if("route" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "route=,".concat(req.query.route as string));
    }
    if("includedelays" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "includedelays=,".concat(req.query.includedelays as string));
    }
    if("fromDateTime" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "fromDateTime=,".concat(req.query.fromDateTime as string));
    }
    if("toDateTime" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "toDateTime=,".concat(req.query.toDateTime as string));
    }
    if("searchDateTimeField" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "searchDateTimeField=,".concat(req.query.searchDateTimeField as string));
    }
    if("fromScheduleDate" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "fromScheduleDate=,".concat(req.query.fromScheduleDate as string));
    }
    if("toScheduleDate" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "toScheduleDate=,".concat(req.query.toScheduleDate as string));
    }
    if("page" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "page=,".concat(req.query.page as string));
    }
    console.log("[INFO] Requested GET /flights".concat(requestQuery));
    try {

        let result: AxiosResponse = await axios.get("https://api.schiphol.nl/public-flights/flights".concat(requestQuery),{
            headers: {
                app_id: schipholApp.app.id,
                app_key: schipholApp.app.key,
                ResourceVersion: schipholApp.app.version,
                Accept: "application/json"
            }
        });
        let flights: [Flight] = result.data.flights;
        
        let meta : object = {
            count : flights.length
        };
        if(result.headers.link) {
            meta = {...meta,...extractLinks(result.headers.link)}
        } 
    
        return res.status(200).json({
            data: flights,
            meta: meta
        });
    }
    catch (e) {
        if(e instanceof Error) {
            return res.status(400).json({
                data: e.message
            });
        }
    }
};

const getFlight = async(req: Request, res: Response, next: NextFunction) => {
    // TODO: get flight by id
}

export default { getFlights };