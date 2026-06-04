<?php
declare(strict_types=1);

// WeatherForecast SDK configuration

class WeatherForecastConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "WeatherForecast",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://www.baguette-radar.com/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "weather" => [],
                ],
            ],
            "entity" => [
        'weather' => [
          'fields' => [
            [
              'name' => 'condition',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'date',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'humidity',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'precipitation_chance',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'temperature_high',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'temperature_low',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 5,
            ],
          ],
          'name' => 'weather',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 5,
                        'kind' => 'query',
                        'name' => 'day',
                        'orig' => 'day',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => 'Paris',
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 'metric',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/weather',
                  'parts' => [
                    'weather',
                  ],
                  'select' => [
                    'exist' => [
                      'day',
                      'location',
                      'unit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return WeatherForecastFeatures::make_feature($name);
    }
}
