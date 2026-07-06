// Typed models for the WeatherForecast SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Weather {
  condition?: string
  date?: string
  humidity?: number
  precipitation_chance?: number
  temperature_high?: number
  temperature_low?: number
}

export interface WeatherListMatch {
  condition?: string
  date?: string
  humidity?: number
  precipitation_chance?: number
  temperature_high?: number
  temperature_low?: number
}

