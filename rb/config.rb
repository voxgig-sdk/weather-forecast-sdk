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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "date",
              "type" => "`$STRING`",
            },
            {
              "name" => "humidity",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "precipitation_chance",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "temperature_high",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "temperature_low",
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
                  "parts" => [
                    "weather",
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
