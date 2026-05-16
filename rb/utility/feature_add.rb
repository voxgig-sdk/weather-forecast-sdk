# WeatherForecast SDK utility: feature_add
module WeatherForecastUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
