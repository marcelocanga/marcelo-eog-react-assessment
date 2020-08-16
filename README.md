## Create React App Visualization

This assessment was bespoke handcrafted for marcelo.

Read more about this assessment [here](https://react.eogresources.com)

## Console Query Examples

`query {getWeatherForLocation(latLong:{latitude:1,longitude:2}){locationName}}
`

{
  "data": {
    "getWeatherForLocation": {
      "locationName": "Lagos"
    }
  }
}


`
query {heartBeat}
`

`
query {getMeasurements(input:
{metricName:"flareTemp"}){metric}}
`

`query  Metrics { getMetrics }
`

{
  "data": {
    "getMetrics": [
      "flareTemp",
      "waterTemp",
      "casingPressure",
      "oilTemp",
      "tubingPressure",
      "injValveOpen"
    ]
  }
}

`query { 
  getLastKnownMeasurement(metricName: "flareTemp") {
		    metric
		    value
		    unit
		    at
		  }
    }
`

    {
      "data": {
        "getLastKnownMeasurement": {
          "metric": "flareTemp",
          "value": 683.12,
          "unit": "F",
          "at": 1597485604137
        }
      }
    }

`query {
  getMultipleMeasurements(input:{metricName:"flareTemp"}) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}`

{
  "metric": "flareTemp",
  "at": 1597448106894,
  "value": 655.1,
  "unit": "F"
},
{
  "metric": "flareTemp",
  "at": 1597448108195,
  "value": 689.46,
  "unit": "F"
},...
