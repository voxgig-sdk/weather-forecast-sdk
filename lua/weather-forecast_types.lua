-- Typed models for the WeatherForecast SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Weather
---@field conditions? string
---@field date? string
---@field humidity? number
---@field precipitation_chance? number
---@field temperature_high? number
---@field temperature_low? number

---@class WeatherListMatch
---@field day? number
---@field location string
---@field unit? string

local M = {}

return M
