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

    public reserve(rowNumber: number, seatLetter : string) {

    } 
}