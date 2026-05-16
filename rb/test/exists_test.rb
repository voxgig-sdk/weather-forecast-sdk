# WeatherForecast SDK exists test

require "minitest/autorun"
require_relative "../WeatherForecast_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = WeatherForecastSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
