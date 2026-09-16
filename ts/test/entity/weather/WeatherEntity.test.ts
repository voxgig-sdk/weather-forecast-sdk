

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WeatherForecastSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('WeatherEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WEATHER_FORECAST_TEST_LIVE=TRUE.
  afterEach(liveDelay('WEATHER_FORECAST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WeatherForecastSDK.test()
    const ent = testsdk.Weather()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WEATHER_FORECAST_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'weather.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"conditions","req":false,"short":"Expected weather conditions","type":"`$STRING`","index$":0},{"active":true,"format":"date","name":"date","req":false,"short":"Forecast date","type":"`$STRING`","index$":1},{"active":true,"format":"double","name":"humidity","req":false,"short":"Average humidity percentage","type":"`$NUMBER`","index$":2},{"active":true,"format":"double","name":"precipitation_chance","req":false,"short":"Probability of precipitation (0-100)","type":"`$NUMBER`","index$":3},{"active":true,"format":"double","name":"temperature_high","req":false,"short":"High temperature for the day","type":"`$NUMBER`","index$":4},{"active":true,"format":"double","name":"temperature_low","req":false,"short":"Low temperature for the day","type":"`$NUMBER`","index$":5}],"name":"weather","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":5,"kind":"query","name":"day","orig":"day","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":"Paris","kind":"query","name":"location","orig":"location","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"example":"metric","kind":"query","name":"unit","orig":"unit","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /weather","json":"{\"operationId\":\"getWeatherForecast\",\"parameters\":[{\"description\":\"Location name (city, address, or coordinates)\",\"example\":\"Paris\",\"in\":\"query\",\"name\":\"location\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Units of measurement (metric or imperial)\",\"in\":\"query\",\"name\":\"units\",\"required\":false,\"schema\":{\"default\":\"metric\",\"enum\":[\"metric\",\"imperial\"],\"type\":\"string\"}},{\"description\":\"Number of forecast days to retrieve\",\"in\":\"query\",\"name\":\"days\",\"required\":false,\"schema\":{\"default\":5,\"maximum\":7,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"current\":{\"conditions\":\"Partly Cloudy\",\"humidity\":65,\"pressure\":1013.25,\"temperature\":22.5,\"timestamp\":\"2024-01-15T14:30:00Z\",\"wind_speed\":15.3},\"forecast\":[{\"conditions\":\"Sunny\",\"date\":\"2024-01-16\",\"humidity\":70,\"precipitation_chance\":10,\"temperature_high\":24,\"temperature_low\":18},{\"conditions\":\"Rainy\",\"date\":\"2024-01-17\",\"humidity\":75,\"precipitation_chance\":80,\"temperature_high\":21,\"temperature_low\":16}],\"location\":{\"country\":\"FR\",\"latitude\":48.8566,\"longitude\":2.3522,\"name\":\"Paris\"}},\"schema\":{\"properties\":{\"current\":{\"properties\":{\"conditions\":{\"description\":\"Current weather conditions\",\"type\":\"string\"},\"humidity\":{\"description\":\"Current humidity percentage\",\"format\":\"double\",\"type\":\"number\"},\"pressure\":{\"description\":\"Atmospheric pressure\",\"format\":\"double\",\"type\":\"number\"},\"temperature\":{\"description\":\"Current temperature\",\"format\":\"double\",\"type\":\"number\"},\"timestamp\":{\"description\":\"Timestamp of the weather data\",\"format\":\"date-time\",\"type\":\"string\"},\"wind_speed\":{\"description\":\"Wind speed\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"forecast\":{\"description\":\"Array of forecast data for upcoming days\",\"items\":{\"properties\":{\"conditions\":{\"description\":\"Expected weather conditions\",\"type\":\"string\"},\"date\":{\"description\":\"Forecast date\",\"format\":\"date\",\"type\":\"string\"},\"humidity\":{\"description\":\"Average humidity percentage\",\"format\":\"double\",\"type\":\"number\"},\"precipitation_chance\":{\"description\":\"Probability of precipitation (0-100)\",\"format\":\"double\",\"type\":\"number\"},\"temperature_high\":{\"description\":\"High temperature for the day\",\"format\":\"double\",\"type\":\"number\"},\"temperature_low\":{\"description\":\"Low temperature for the day\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"location\":{\"properties\":{\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Location name\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with weather data\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"INVALID_LOCATION\",\"error\":\"Invalid location parameter\"},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"LOCATION_NOT_FOUND\",\"error\":\"Location not found\"},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Location not found\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"INTERNAL_ERROR\",\"error\":\"Internal server error\"},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/weather","segments":[{"lit":"weather"}],"select":{"exist":["day","location","unit"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"weather","name__orig":"weather","Name":"Weather","name_":"weather","name-":"weather","NAME":"WEATHER","index$":0}, {"active":true,"entity":"weather","key$":"BasicWeatherFlow","kind":"basic","name":"BasicWeatherFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"weather_ref01"}}],"index$":0}]}, 'Weather')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let weather_ref01_data = Object.values(setup.data.existing.weather)[0] as any

    // LIST
    const weather_ref01_ent = client.Weather()
    const weather_ref01_match: any = {}

    const weather_ref01_list = (await weather_ref01_ent.list(weather_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/weather/WeatherTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WeatherForecastSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['weather01','weather02','weather03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WEATHER_FORECAST_TEST_WEATHER_ENTID': idmap,
    'WEATHER_FORECAST_TEST_LIVE': 'FALSE',
    'WEATHER_FORECAST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['WEATHER_FORECAST_TEST_WEATHER_ENTID']

  const live = 'TRUE' === env.WEATHER_FORECAST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WEATHER_FORECAST_TEST_WEATHER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WeatherForecastSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.WEATHER_FORECAST_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
