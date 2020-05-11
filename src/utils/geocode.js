const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3d0b2gyMDAwIiwiYSI6ImNrYTEyZmUydzA2aWczZW9yZXR0ajQydXQifQ.Q1LKtkWM1LR33jXfQkBEDw&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.message !== undefined) {
            callback(body.message, undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].geometry.coordinates[0],
                longtitude: body.features[0].geometry.coordinates[1]
            });
        }
    })
}

module.exports = geocode