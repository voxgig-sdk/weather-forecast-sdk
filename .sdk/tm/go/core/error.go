package core

type WeatherForecastError struct {
	IsWeatherForecastError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewWeatherForecastError(code string, msg string, ctx *Context) *WeatherForecastError {
	return &WeatherForecastError{
		IsWeatherForecastError: true,
		Sdk:              "WeatherForecast",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *WeatherForecastError) Error() string {
	return e.Msg
}
