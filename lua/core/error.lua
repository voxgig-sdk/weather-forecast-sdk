-- WeatherForecast SDK error

local WeatherForecastError = {}
WeatherForecastError.__index = WeatherForecastError


function WeatherForecastError.new(code, msg, ctx)
  local self = setmetatable({}, WeatherForecastError)
  self.is_sdk_error = true
  self.sdk = "WeatherForecast"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function WeatherForecastError:error()
  return self.msg
end


function WeatherForecastError:__tostring()
  return self.msg
end


return WeatherForecastError
