<?php
declare(strict_types=1);

// WeatherForecast SDK utility: prepare_body

class WeatherForecastPrepareBody
{
    public static function call(WeatherForecastContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
