# WeatherForecast SDK exists test

import pytest
from weatherforecast_sdk import WeatherForecastSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WeatherForecastSDK.test(None, None)
        assert testsdk is not None
