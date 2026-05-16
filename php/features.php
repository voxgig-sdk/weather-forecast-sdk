<?php
declare(strict_types=1);

// WeatherForecast SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class WeatherForecastFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new WeatherForecastBaseFeature();
            case "test":
                return new WeatherForecastTestFeature();
            default:
                return new WeatherForecastBaseFeature();
        }
    }
}
