const request = require('request')

const geocode = (address, callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2FiZHByaWNlIiwiYSI6ImNsOG0ycmY2ZjBoMHozb3FqODlhMjA4djUifQ.V7pJjWq9c7zahiNpApkJjQ'

    request({url, json: true}, (error, { body }) => {
        
        if(error){
            callback('Unable to connect to location services', undefined)
         } 
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
         } 
        else{ 
            const { [0]:latitude, [1]:longitude } = body.features[0].geometry.coordinates
        //    callback(undefined, {
        //      latitude: response.body.features[0].geometry.coordinates[0],
        //     longitude: response.body.features[0].geometry.coordinates[1],
        //     location: response.body.features[0].place_name,
        //     })
        callback(undefined, {latitude, longitude,
           location: body.features[0].place_name,
           })
        }
    })
}

module.exports = geocode