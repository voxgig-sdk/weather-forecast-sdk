# WeatherForecast SDK feature factory

from weatherforecast_sdk.feature.base_feature import WeatherForecastBaseFeature
from weatherforecast_sdk.feature.ratelimit_feature import WeatherForecastRatelimitFeature
from weatherforecast_sdk.feature.retry_feature import WeatherForecastRetryFeature
from weatherforecast_sdk.feature.test_feature import WeatherForecastTestFeature
from weatherforecast_sdk.feature.timeout_feature import WeatherForecastTimeoutFeature


_FEATURES = {
    "base": lambda: WeatherForecastBaseFeature(),
    "ratelimit": lambda: WeatherForecastRatelimitFeature(),
    "retry": lambda: WeatherForecastRetryFeature(),
    "test": lambda: WeatherForecastTestFeature(),
    "timeout": lambda: WeatherForecastTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
