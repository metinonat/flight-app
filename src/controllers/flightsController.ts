import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Flight } from "../utils/interfaces/flightInterface";
import schipholApp from "../configs/schiphol.config";

const getFlights = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: implement queries
    let result: AxiosResponse = await axios.get("https://api.schiphol.nl/public-flights/flights",{
        headers: {
            app_id: schipholApp.app.id,
            app_key: schipholApp.app.key,
            ResourceVersion: schipholApp.app.version,
            Accept: "application/json"
        }
    });
    let flights: [Flight] = result.data;
    console.log(flights);
    return res.status(200).json({
        message: flights
    });
};

export default { getFlights };