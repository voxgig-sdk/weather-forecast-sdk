
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
          "name": "condition",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "humidity",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "precipitation_chance",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "temperature_high",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 4
        },
        {
          "name": "temperature_low",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 5
        }
      ],
      "name": "weather",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "Paris",
                    "kind": "query",
                    "name": "location",
                    "orig": "location",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
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

