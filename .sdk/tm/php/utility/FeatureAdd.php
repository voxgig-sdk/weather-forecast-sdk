<?php
declare(strict_types=1);

// WeatherForecast SDK utility: feature_add

class WeatherForecastFeatureAdd
{
    public static function call(WeatherForecastContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
