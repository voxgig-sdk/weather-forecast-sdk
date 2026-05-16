
import { Context } from './Context'


class WeatherForecastError extends Error {

  isWeatherForecastError = true

  sdk = 'WeatherForecast'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  WeatherForecastError
}

