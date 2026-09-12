import { Context } from './Context';
declare class WeatherForecastError extends Error {
    isWeatherForecastError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { WeatherForecastError };
