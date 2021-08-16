'use strict'
const weatherData = require('./data/weather.json')

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const server = express();
server.use(cors());


const PORT = process.env.PORT;

server.get('/weather', (req, res) => {
try{
    let cityWeatherData = weatherData.find(city => city.city_name.toLowerCase() === req.query.searchQuery.toLowerCase())
    let cityWeatherDataDays = cityWeatherData.data.map(day => {
        let forecastDay = new Forecast(day, day.weather.description)
        return forecastDay;
    });
    res.send(cityWeatherDataDays);

}
catch(error){
    res.send(error)

}
    
  
})


server.get('*',(req,res)=>{
    res.status(500).send("!Oops something went wrong.")
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));



class Forecast {
    constructor(data, description) {
        this.data = data;
        this.description = description;
    }
}




