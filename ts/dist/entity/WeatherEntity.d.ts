import { WeatherForecastEntityBase } from '../WeatherForecastEntityBase';
import type { WeatherForecastSDK } from '../WeatherForecastSDK';
import type { Control } from '../types';
import type { Weather, WeatherListMatch } from '../WeatherForecastTypes';
declare class WeatherEntity extends WeatherForecastEntityBase<Weather> {
    constructor(client: WeatherForecastSDK, entopts: any);
    make(this: WeatherEntity): WeatherEntity;
    list(this: any, reqmatch?: WeatherListMatch, ctrl?: Control): Promise<WeatherEntity[]>;
}
export { WeatherEntity };
