package = "voxgig-sdk-weather-forecast"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/weather-forecast-sdk.git"
}
description = {
  summary = "WeatherForecast SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["weather-forecast_sdk"] = "weather-forecast_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
