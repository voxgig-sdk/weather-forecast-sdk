# WeatherForecast SDK utility: make_context

from projectname_sdk.core.context import WeatherForecastContext


def make_context_util(ctxmap, basectx):
    return WeatherForecastContext(ctxmap, basectx)
