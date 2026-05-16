<?php
declare(strict_types=1);

// WeatherForecast SDK utility: result_headers

class WeatherForecastResultHeaders
{
    public static function call(WeatherForecastContext $ctx): ?WeatherForecastResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
