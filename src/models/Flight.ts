import { pool } from "../services/db";
import { AircraftTypeType, CheckinAllocationsType, FlightInterface, PublicFlightStateType, RouteType, TransferPositionsType } from "./FlightInterface";

export class Flight implements FlightInterface {
    lastUpdatedAt: string | undefined;
    actualLandingTime: string | undefined;
    aircraftType: AircraftTypeType | undefined;
    checkinAllocations: CheckinAllocationsType | undefined;
    estimatedLandingTime: string | undefined;
    expectedTimeBoarding: string | undefined;
    expectedTimeGateClosing: string | undefined;
    expectedTimeGateOpen: string | undefined;
    expectedSecurityFilter: string | undefined;
    flightDirection: string | undefined;
    flightName: string | undefined;
    flightNumber: number | undefined;
    gate: string | undefined;
    pier: string | undefined;
    id: string;
    mainFlight: string | undefined;
    prefixIATA: string | undefined;
    prefixICAO: string | undefined;
    airlineCode: number | undefined;
    publicFlightState: PublicFlightStateType | undefined;
    route: RouteType | undefined;
    scheduleDateTime: string | undefined;
    scheduleDate: string | undefined;
    scheduleTime: string | undefined;
    serviceType: string | undefined;
    terminal: number | undefined;
    transferPositions: TransferPositionsType | undefined;
    
    public constructor(id : string) {
        this.id = id;
    }

    public availableSeats() {

    }

    public async reserve(user_id : number, rowNumber: number, seatLetter : string) : Promise<object> {
        var query : string = "INSERT INTO reservations(user_id, flight_id, row, seat, canceled_at) VALUES($1, $2, $3, $4, $5) RETURNING *";
        var obj : object = {};
        await pool.query(query, [user_id, this.id, rowNumber, seatLetter, null]).then((res) => {
            console.log(res);
            obj =  res.rows[0];
        }).catch((err) => {
            console.log(err);
        })
        return obj;
    } 
}