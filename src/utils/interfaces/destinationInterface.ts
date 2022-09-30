export interface Destination {
    city: string;
    country: string;
    iata: string;
    publicName: PublicName;
}

export type PublicName = {
    dutch: string;
    english: string;
}