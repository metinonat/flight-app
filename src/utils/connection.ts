import axios, {AxiosResponse } from "axios";
import schipholApp from "../configs/schiphol.config";
import {createClient} from "redis";

/** Connection return type/interface */
export interface APIResponseInterface {
    data : any,
    headers: any
}

/** Create Redis Client */
export const redisClient = createClient({
    socket : {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT as string)
    },
    password: process.env.REDIS_PASS
});

redisClient.on('error', (err) => {
    console.log(`[REDIS/ERROR] ${err}`);
})
redisClient.on('connect', function() {
    console.log('Connected to Redis!');
});
const connect = async () => {
    await redisClient.connect();
}
/** Connect to Redis  */
connect();

export async function getCall(path: string) : Promise<APIResponseInterface> {
    var data = await redisClient.get(path).catch((err) => {
        console.log(err);
    });
    var headers = await redisClient.get(path.concat(".headers")).catch((err) => {
        console.log(err);
    });
    if(data && data != "null") {
        var resData = JSON.parse(data as string);
        var resHeaders = JSON.parse(headers as string);
        console.log(`${path} retrieved from Redis.`);
        return {
            data: resData,
            headers: resHeaders
        };
    }
    else {
        var res : AxiosResponse = await axios.get(schipholApp.app.baseURL.concat(path),{
            headers: {
                app_id: schipholApp.app.id,
                app_key: schipholApp.app.key,
                ResourceVersion: schipholApp.app.version,
                Accept: "application/json"
            }
        });
        redisClient.set(path, JSON.stringify(res.data));
        redisClient.set(path.concat(".headers"), JSON.stringify(res.headers));
        console.log(`${path} is retrieved from the API`);
        return {
            data: res.data,
            headers: res.headers
        };
    }

}

export default {getCall, redisClient};