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
			"slug": "weather-forecast",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"short": "Expected weather conditions",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "date",
						"short": "Forecast date",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "double",
						"name": "humidity",
						"short": "Average humidity percentage",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "double",
						"name": "precipitation_chance",
						"short": "Probability of precipitation (0-100)",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "double",
						"name": "temperature_high",
						"short": "High temperature for the day",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"format": "double",
						"name": "temperature_low",
						"short": "Low temperature for the day",
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
								"segments": []any{
									map[string]any{
										"lit": "weather",
									},
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
								"parts": []any{
									"weather",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
