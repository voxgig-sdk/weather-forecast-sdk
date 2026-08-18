# WeatherForecast SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "humidity",
            "type": "`$NUMBER`",
          },
          {
            "name": "precipitation_chance",
            "type": "`$NUMBER`",
          },
          {
            "name": "temperature_high",
            "type": "`$NUMBER`",
          },
          {
            "name": "temperature_low",
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
                "parts": [
                  "weather",
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
