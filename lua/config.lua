-- WeatherForecast SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "WeatherForecast",
      slug = "weather-forecast",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://www.baguette-radar.com/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["weather"] = {},
      },
    },
    entity = {
      ["weather"] = {
        ["fields"] = {
          {
            ["name"] = "conditions",
            ["short"] = "Expected weather conditions",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "date",
            ["short"] = "Forecast date",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "humidity",
            ["short"] = "Average humidity percentage",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "precipitation_chance",
            ["short"] = "Probability of precipitation (0-100)",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "temperature_high",
            ["short"] = "High temperature for the day",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "temperature_low",
            ["short"] = "Low temperature for the day",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "weather",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 5,
                      ["kind"] = "query",
                      ["name"] = "day",
                      ["orig"] = "day",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "Paris",
                      ["kind"] = "query",
                      ["name"] = "location",
                      ["orig"] = "location",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "metric",
                      ["kind"] = "query",
                      ["name"] = "unit",
                      ["orig"] = "unit",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/weather",
                ["parts"] = {
                  "weather",
                },
                ["select"] = {
                  ["exist"] = {
                    "day",
                    "location",
                    "unit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
