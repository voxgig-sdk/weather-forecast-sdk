package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "WeatherForecast",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://www.baguette-radar.com/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"weather": map[string]any{},
			},
		},
		"entity": map[string]any{
			"weather": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "conditions",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "humidity",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "precipitation_chance",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "temperature_high",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "temperature_low",
						"type": "`$NUMBER`",
					},
				},
				"name": "weather",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 5,
											"kind": "query",
											"name": "day",
											"orig": "day",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "Paris",
											"kind": "query",
											"name": "location",
											"orig": "location",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "metric",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/weather",
								"parts": []any{
									"weather",
								},
								"select": map[string]any{
									"exist": []any{
										"day",
										"location",
										"unit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
