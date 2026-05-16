# WeatherForecast SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WeatherForecastUtility.registrar = ->(u) {
  u.clean = WeatherForecastUtilities::Clean
  u.done = WeatherForecastUtilities::Done
  u.make_error = WeatherForecastUtilities::MakeError
  u.feature_add = WeatherForecastUtilities::FeatureAdd
  u.feature_hook = WeatherForecastUtilities::FeatureHook
  u.feature_init = WeatherForecastUtilities::FeatureInit
  u.fetcher = WeatherForecastUtilities::Fetcher
  u.make_fetch_def = WeatherForecastUtilities::MakeFetchDef
  u.make_context = WeatherForecastUtilities::MakeContext
  u.make_options = WeatherForecastUtilities::MakeOptions
  u.make_request = WeatherForecastUtilities::MakeRequest
  u.make_response = WeatherForecastUtilities::MakeResponse
  u.make_result = WeatherForecastUtilities::MakeResult
  u.make_point = WeatherForecastUtilities::MakePoint
  u.make_spec = WeatherForecastUtilities::MakeSpec
  u.make_url = WeatherForecastUtilities::MakeUrl
  u.param = WeatherForecastUtilities::Param
  u.prepare_auth = WeatherForecastUtilities::PrepareAuth
  u.prepare_body = WeatherForecastUtilities::PrepareBody
  u.prepare_headers = WeatherForecastUtilities::PrepareHeaders
  u.prepare_method = WeatherForecastUtilities::PrepareMethod
  u.prepare_params = WeatherForecastUtilities::PrepareParams
  u.prepare_path = WeatherForecastUtilities::PreparePath
  u.prepare_query = WeatherForecastUtilities::PrepareQuery
  u.result_basic = WeatherForecastUtilities::ResultBasic
  u.result_body = WeatherForecastUtilities::ResultBody
  u.result_headers = WeatherForecastUtilities::ResultHeaders
  u.transform_request = WeatherForecastUtilities::TransformRequest
  u.transform_response = WeatherForecastUtilities::TransformResponse
}
