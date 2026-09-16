# WeatherForecast SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "WeatherForecast",
            "slug": "weather-forecast",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.baguette-radar.com/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "weather": {},
            },
        },
        "entity": {
      "weather": {
        "fields": [
          {
            "name": "conditions",
            "short": "Expected weather conditions",
            "type": "`$STRING`",
          },
          {
            "format": "date",
            "name": "date",
            "short": "Forecast date",
            "type": "`$STRING`",
          },
          {
            "format": "double",
            "name": "humidity",
            "short": "Average humidity percentage",
            "type": "`$NUMBER`",
          },
          {
            "format": "double",
            "name": "precipitation_chance",
            "short": "Probability of precipitation (0-100)",
            "type": "`$NUMBER`",
          },
          {
            "format": "double",
            "name": "temperature_high",
            "short": "High temperature for the day",
            "type": "`$NUMBER`",
          },
          {
            "format": "double",
            "name": "temperature_low",
            "short": "Low temperature for the day",
            "type": "`$NUMBER`",
          },
        ],
        "name": "weather",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 5,
                      "kind": "query",
                      "name": "day",
                      "orig": "day",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "Paris",
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "metric",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/weather",
                "segments": [
                  {
                    "lit": "weather",
                  },
                ],
                "select": {
                  "exist": [
                    "day",
                    "location",
                    "unit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "weather",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
