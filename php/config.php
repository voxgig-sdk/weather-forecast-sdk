<?php
declare(strict_types=1);

// WeatherForecast SDK configuration

class WeatherForecastConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "WeatherForecast",
                "slug" => "weather-forecast",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'name' => 'conditions',
              'short' => 'Expected weather conditions',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date',
              'name' => 'date',
              'short' => 'Forecast date',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'double',
              'name' => 'humidity',
              'short' => 'Average humidity percentage',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'precipitation_chance',
              'short' => 'Probability of precipitation (0-100)',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'temperature_high',
              'short' => 'High temperature for the day',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'temperature_low',
              'short' => 'Low temperature for the day',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'weather',
          'op' => [
            'list' => [
              'input' => 'data',
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
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'Paris',
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'metric',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/weather',
                  'segments' => [
                    [
                      'lit' => 'weather',
                    ],
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
                  'parts' => [
                    'weather',
                  ],
                ],
              ],
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
