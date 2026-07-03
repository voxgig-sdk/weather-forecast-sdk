
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://www.baguette-radar.com/api',

    auth: {
      prefix: 'Bearer',
    },

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
          "active": true,
          "name": "condition",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "humidity",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "precipitation_chance",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "temperature_high",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "temperature_low",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 5
        }
      ],
      "name": "weather",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 5,
                    "kind": "query",
                    "name": "day",
                    "orig": "day",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": "Paris",
                    "kind": "query",
                    "name": "location",
                    "orig": "location",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            }
          ],
          "key$": "list"
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

