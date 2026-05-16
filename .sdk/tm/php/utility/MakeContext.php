<?php
declare(strict_types=1);

// WeatherForecast SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WeatherForecastMakeContext
{
    public static function call(array $ctxmap, ?WeatherForecastContext $basectx): WeatherForecastContext
    {
        return new WeatherForecastContext($ctxmap, $basectx);
    }
}
