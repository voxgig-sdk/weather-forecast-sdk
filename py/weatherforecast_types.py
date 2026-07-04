# Typed models for the WeatherForecast SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Weather:
    condition: Optional[str] = None
    date: Optional[str] = None
    humidity: Optional[float] = None
    precipitation_chance: Optional[float] = None
    temperature_high: Optional[float] = None
    temperature_low: Optional[float] = None


@dataclass
class WeatherListMatch:
    condition: Optional[str] = None
    date: Optional[str] = None
    humidity: Optional[float] = None
    precipitation_chance: Optional[float] = None
    temperature_high: Optional[float] = None
    temperature_low: Optional[float] = None

