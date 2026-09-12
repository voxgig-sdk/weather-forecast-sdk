export interface Weather {
    conditions?: string;
    date?: string;
    humidity?: number;
    precipitation_chance?: number;
    temperature_high?: number;
    temperature_low?: number;
}
export interface WeatherListMatch {
    day?: number;
    location: string;
    unit?: string;
}
