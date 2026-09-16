# WeatherForecast SDK configuration

module WeatherForecastConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "WeatherForecast",
        "slug" => "weather-forecast",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://www.baguette-radar.com/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "weather" => {},
        },
      },
      "entity" => {
        "weather" => {
          "fields" => [
            {
              "name" => "conditions",
              "short" => "Expected weather conditions",
              "type" => "`$STRING`",
            },
            {
              "format" => "date",
              "name" => "date",
              "short" => "Forecast date",
              "type" => "`$STRING`",
            },
            {
              "format" => "double",
              "name" => "humidity",
              "short" => "Average humidity percentage",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
              "name" => "precipitation_chance",
              "short" => "Probability of precipitation (0-100)",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
              "name" => "temperature_high",
              "short" => "High temperature for the day",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
              "name" => "temperature_low",
              "short" => "Low temperature for the day",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "weather",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 5,
                        "kind" => "query",
                        "name" => "day",
                        "orig" => "day",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "Paris",
                        "kind" => "query",
                        "name" => "location",
                        "orig" => "location",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "metric",
                        "kind" => "query",
                        "name" => "unit",
                        "orig" => "unit",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/weather",
                  "segments" => [
                    {
                      "lit" => "weather",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "day",
                      "location",
                      "unit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "weather",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    WeatherForecastFeatures.make_feature(name)
  end
end
