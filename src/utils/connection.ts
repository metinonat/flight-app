import axios, { AxiosResponse } from "axios";
import schipholApp from "../configs/schiphol.config";

export async function getCall(path: string) : Promise<AxiosResponse<any, any>> {
    return await axios.get(schipholApp.app.baseURL.concat(path),{
        headers: {
            app_id: schipholApp.app.id,
            app_key: schipholApp.app.key,
            ResourceVersion: schipholApp.app.version,
            Accept: "application/json"
        }
    });
}

export default {getCall};