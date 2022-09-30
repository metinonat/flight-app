import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { extractLinks, urlQueryBuilder } from '../utils/helpers';
import { getCall } from '../utils/connection';
import { Destination } from '../utils/interfaces/destinationInterface';

const getDestinations = async(req: Request, res: Response, next: NextFunction) => {
    var requestQuery : string  = "";
    if("sort" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "sort=,".concat(req.query.sort as string), req.query.order as string);
    }
    if("page" in req.query) {
        requestQuery = urlQueryBuilder(requestQuery,
            "page=,".concat(req.query.page as string));
    }
    console.log("[INFO] Requested GET /destinations".concat(requestQuery));
    try {
        let result : AxiosResponse = await getCall("/destinations".concat(requestQuery));
        let destinations : [Destination] = result.data.destinations;
        
        let meta : object = {
            count : destinations.length
        };
        if(result.headers.link) {
            meta = {...meta,...extractLinks(result.headers.link)}
        } 
        
        return res.status(200).json({
            data: destinations,
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

const getDestination = async(req: Request, res: Response, next: NextFunction) => {
    console.log("[INFO] Requested GET /destinations/".concat(req.params.iata));
    try {
        let result : AxiosResponse = await getCall("/destinations/".concat(req.params.iata));
        let destination: Destination = result.data;
        return res.status(200).json({
            data: destination
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

export default { getDestinations, getDestination};