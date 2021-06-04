const request = require('postman-request')

const forecast = ({latitude, longitude}, callback) => {
    const token = '9e97aee082a74781344f87bcde5f065c'
    const url = `http://api.weatherstack.com/current?access_key=${token}&query=${latitude,longitude}&units=f`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const data = body.current
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature}°F out. It feels like ${data.feelslike}°F out.`)
        }
    })

}

module.exports = forecast