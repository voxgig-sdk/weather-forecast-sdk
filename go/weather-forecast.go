package voxgigweatherforecastsdk

import (
	"github.com/voxgig-sdk/weather-forecast-sdk/go/core"
	"github.com/voxgig-sdk/weather-forecast-sdk/go/entity"
	"github.com/voxgig-sdk/weather-forecast-sdk/go/feature"
	_ "github.com/voxgig-sdk/weather-forecast-sdk/go/utility"
)

// Type aliases preserve external API.
type WeatherForecastSDK = core.WeatherForecastSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WeatherForecastEntity = core.WeatherForecastEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WeatherForecastError = core.WeatherForecastError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewWeatherEntityFunc = func(client *core.WeatherForecastSDK, entopts map[string]any) core.WeatherForecastEntity {
		return entity.NewWeatherEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWeatherForecastSDK = core.NewWeatherForecastSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewWeatherForecastSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *WeatherForecastSDK  { return NewWeatherForecastSDK(nil) }
func Test() *WeatherForecastSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
