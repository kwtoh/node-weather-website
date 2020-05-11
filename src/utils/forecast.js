const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3e355eabb5769fc2356d60a6c8322a17&query=' + long + ',' + lat + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain with a humidity of ' + body.current.humidity + '%.')
        } 
    })
}

module.exports = forecast