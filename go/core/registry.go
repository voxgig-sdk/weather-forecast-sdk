package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewWeatherEntityFunc func(client *WeatherForecastSDK, entopts map[string]any) WeatherForecastEntity

