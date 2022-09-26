export interface Flight {
    lastUpdatedAt: string;
    actualLandingTime: string;
    aircraftType: AircraftTypeType;
    checkinAllocations: CheckinAllocationsType;
    estimatedLandingTime: string;
    expectedTimeBoarding: string;
    expectedTimeGateClosing: string;
    expectedTimeGateOpen: string;
    expectedSecurityFilter: string;
    flightDirection: string;
    flightName: string;
    flightNumber: number;
    gate: string;
    pier: string;
    id: string;
    mainFlight: string;
    airlineCode: number;
    publicFlightState: PublicFlightStateType;
    route: RouteType;
    scheduleDateTime: string;
    scheduleDate: string;
    scheduleTime: string;
    serviceType: string;
    terminal: number;
    transferPositions: TransferPositionsType;
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