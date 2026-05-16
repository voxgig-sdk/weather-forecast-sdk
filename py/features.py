# WeatherForecast SDK feature factory

from feature.base_feature import WeatherForecastBaseFeature
from feature.test_feature import WeatherForecastTestFeature


def _make_feature(name):
    features = {
        "base": lambda: WeatherForecastBaseFeature(),
        "test": lambda: WeatherForecastTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
