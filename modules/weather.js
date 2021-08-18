'use strict'

const axios = require('axios');

const getWeather = (req,res)=>{

        const cityName = req.query.searchQuery;
        const lat = req.query.lat;
        const lon = req.query.lon
        const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${process.env.WEATHER_BIT_API_KEY}&lat=${lat}&lon=${lon}&city=${cityName}`;
    
        axios.get(weatherURL).then((cityWeatherData) => {
            let cityWeatherDataDialy = cityWeatherData.data.data.map(day => {
                let forecastDay = new Forecast(day);
                return forecastDay;
            })
            res.send(cityWeatherDataDialy)
    
        }).catch(error => {
            res.send(error)
        })

}



class Forecast {
    constructor(day) {
        this.date = day.datetime;
        this.description = `Low of ${day.low_temp} , High of ${day.max_temp} with  ${day.weather.description}`;
    }
}

module.exports = getWeather;
