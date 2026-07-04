# frozen_string_literal: true

# Typed models for the WeatherForecast SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Weather entity data model.
#
# @!attribute [rw] condition
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] humidity
#   @return [Float, nil]
#
# @!attribute [rw] precipitation_chance
#   @return [Float, nil]
#
# @!attribute [rw] temperature_high
#   @return [Float, nil]
#
# @!attribute [rw] temperature_low
#   @return [Float, nil]
Weather = Struct.new(
  :condition,
  :date,
  :humidity,
  :precipitation_chance,
  :temperature_high,
  :temperature_low,
  keyword_init: true
)

# Match filter for Weather#list (any subset of Weather fields).
#
# @!attribute [rw] condition
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] humidity
#   @return [Float, nil]
#
# @!attribute [rw] precipitation_chance
#   @return [Float, nil]
#
# @!attribute [rw] temperature_high
#   @return [Float, nil]
#
# @!attribute [rw] temperature_low
#   @return [Float, nil]
WeatherListMatch = Struct.new(
  :condition,
  :date,
  :humidity,
  :precipitation_chance,
  :temperature_high,
  :temperature_low,
  keyword_init: true
)

