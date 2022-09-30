import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Airline } from '../utils/interfaces/airlineInterface';
import { extractLinks, urlQueryBuilder } from '../utils/helpers';
import { getCall } from '../utils/connection';

const getAirlines = async(req: Request, res: Response, next: NextFunction) => {
    var requestQuery : string  = "";
    if("sort" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "sort=,".concat(req.query.sort as string), req.query.order as string);
    }
    if("page" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "page=,".concat(req.query.page as string));
    }
    console.log("[INFO] Requested GET /airlines".concat(requestQuery));
    try {
        let result : AxiosResponse = await getCall("/airlines".concat(requestQuery));
        let airlines : [Airline] = result.data.airlines;
        
        let meta : object = {
            count : airlines.length
        };
        if(result.headers.link) {
            meta = {...meta,...extractLinks(result.headers.link)}
        } 
        
        return res.status(200).json({
            data: airlines,
            meta: meta
        })
    }
    catch(e) {
        if(e instanceof Error) {
            return res.status(400).json({
                data: e.message
            });
        }
    }

}

const getAirline = async(req: Request, res: Response, next: NextFunction) => {
    console.log("[INFO] Requested GET /airlines/".concat(req.params.id));
    try {
        let result : AxiosResponse = await getCall("/airlines/".concat(req.params.id));
        let airline: Airline = result.data;
        return res.status(200).json({
            data: airline
        });
    }
    catch(e) {
        if(e instanceof Error) {
            return res.status(400).json({
                data: e.message
            });
        }
    }
}


export default {getAirlines, getAirline};