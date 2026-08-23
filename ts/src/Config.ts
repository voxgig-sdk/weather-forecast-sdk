
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'WeatherForecast',
        slug: "weather-forecast",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://www.baguette-radar.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      weather: {
      },

    }
  }


  entity = {
    "weather": {
      "fields": [
        {
          "name": "conditions",
          "short": "Expected weather conditions",
          "type": "`$STRING`"
        },
        {
          "name": "date",
          "short": "Forecast date",
          "type": "`$STRING`"
        },
        {
          "name": "humidity",
          "short": "Average humidity percentage",
          "type": "`$NUMBER`"
        },
        {
          "name": "precipitation_chance",
          "short": "Probability of precipitation (0-100)",
          "type": "`$NUMBER`"
        },
        {
          "name": "temperature_high",
          "short": "High temperature for the day",
          "type": "`$NUMBER`"
        },
        {
          "name": "temperature_low",
          "short": "Low temperature for the day",
          "type": "`$NUMBER`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "Paris",
                    "kind": "query",
                    "name": "location",
                    "orig": "location",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/weather",
              "parts": [
                "weather"
              ],
              "select": {
                "exist": [
                  "day",
                  "location",
                  "unit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

