<?php
declare(strict_types=1);

// WeatherForecast SDK base feature

class WeatherForecastBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(WeatherForecastContext $ctx, array $options): void {}
    public function PostConstruct(WeatherForecastContext $ctx): void {}
    public function PostConstructEntity(WeatherForecastContext $ctx): void {}
    public function SetData(WeatherForecastContext $ctx): void {}
    public function GetData(WeatherForecastContext $ctx): void {}
    public function GetMatch(WeatherForecastContext $ctx): void {}
    public function SetMatch(WeatherForecastContext $ctx): void {}
    public function PrePoint(WeatherForecastContext $ctx): void {}
    public function PreSpec(WeatherForecastContext $ctx): void {}
    public function PreRequest(WeatherForecastContext $ctx): void {}
    public function PreResponse(WeatherForecastContext $ctx): void {}
    public function PreResult(WeatherForecastContext $ctx): void {}
    public function PreDone(WeatherForecastContext $ctx): void {}
    public function PreUnexpected(WeatherForecastContext $ctx): void {}
}
