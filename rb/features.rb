# WeatherForecast SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WeatherForecastFeatures
  def self.make_feature(name)
    case name
    when "base"
      WeatherForecastBaseFeature.new
    when "ratelimit"
      WeatherForecastRatelimitFeature.new
    when "retry"
      WeatherForecastRetryFeature.new
    when "test"
      WeatherForecastTestFeature.new
    when "timeout"
      WeatherForecastTimeoutFeature.new
    else
      WeatherForecastBaseFeature.new
    end
  end
end
