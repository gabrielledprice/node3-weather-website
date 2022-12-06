const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4d8420864495a2f6188a2df4893880b6&query=" +
    address;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to reach weather service", undefined);
    } else if (response.body.success === false) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      // callback(undefined, {temperature: response.body.current.temperature,
      // Description: response.body.current.weather_descriptions,
      // Rain: response.body.current.precip,})
      const {
        temperature,
        weather_descriptions: Description,
        precip: Rain,
      } = response.body.current;
      callback(undefined, { temperature, Description, Rain });
    }
  });
};

module.exports = forecast;
