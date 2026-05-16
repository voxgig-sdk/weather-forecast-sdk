# WeatherForecast SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module WeatherForecastFeatures
  def self.make_feature(name)
    case name
    when "base"
      WeatherForecastBaseFeature.new
    when "test"
      WeatherForecastTestFeature.new
    else
      WeatherForecastBaseFeature.new
    end
  end
end
