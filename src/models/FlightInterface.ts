export interface FlightInterface {
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
}

export type AircraftTypeType = {
    iataMain: string;
    iataSub: string;
}

export type CheckinAllocationsType = {
    checkinAllocations: Array<CheckinAllocationType>;
    remarks: RemarksType;
}

export type PublicFlightStateType = {
    flightStates: Array<string>;
}

export type RouteType = {
    destinations: Array<string>;
    eu: "S" | "E" | "N" | null; // optional, S (Schengen), E (Europe) or N (non-Europe)
    visa: boolean; // Indicates if a visum is required for destination
}

export type TransferPositionsType = {
    transferPositions: Array<number>;
}

export type CheckinAllocationType = {
    endTime: string;
    rows: RowsType;
    startTime: string;
}

export type RemarksType = {
    remarks: Array<string>
}

export type RowsType = {
    rows: Array<RowType>;
}

export type RowType = {
    position: string;
    desks: DesksType;
}

export type DesksType = {
    desks: Array<DeskType>;
}

export type DeskType = {
    checkinClass: CheckinClassType;
    position: number;
}

export type CheckinClassType = {
    code: string;
    description: string;
}