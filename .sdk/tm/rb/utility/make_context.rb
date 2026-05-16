# WeatherForecast SDK utility: make_context
require_relative '../core/context'
module WeatherForecastUtilities
  MakeContext = ->(ctxmap, basectx) {
    WeatherForecastContext.new(ctxmap, basectx)
  }
end
