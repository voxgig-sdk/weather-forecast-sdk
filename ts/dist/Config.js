"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'WeatherForecast',
        slug: "weather-forecast",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://www.baguette-radar.com/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            weather: {},
        }
    };
    entity = {
        "weather": {
            "fields": [
                {
                    "name": "conditions",
                    "short": "Expected weather conditions",
                    "type": "`$STRING`"
                },
                {
                    "format": "date",
                    "name": "date",
                    "short": "Forecast date",
                    "type": "`$STRING`"
                },
                {
                    "format": "double",
                    "name": "humidity",
                    "short": "Average humidity percentage",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "precipitation_chance",
                    "short": "Probability of precipitation (0-100)",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "temperature_high",
                    "short": "High temperature for the day",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
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
                            "segments": [
                                {
                                    "lit": "weather"
                                }
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
                            "parts": [
                                "weather"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map