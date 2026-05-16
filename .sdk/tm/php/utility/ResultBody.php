<?php
declare(strict_types=1);

// WeatherForecast SDK utility: result_body

class WeatherForecastResultBody
{
    public static function call(WeatherForecastContext $ctx): ?WeatherForecastResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
