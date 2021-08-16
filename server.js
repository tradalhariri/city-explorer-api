'use strict'
const weatherData = require('./data/weather.json')

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const server = express();
server.use(cors());


const PORT = process.env.PORT;

server.get('/',(req,res)=>{
    res.send('<h1>Welcome to the City Explorer Api</h1>');
})

server.get('/weather', (req, res) => {
try{
    let cityWeatherData = weatherData.find(city =>  
        
        city.city_name.toLowerCase() === req.query.searchQuery.toLowerCase() && parseInt(city.lat) === parseInt(req.query.lat) && parseInt(city.lon) === parseInt(req.query.lon));

    let cityWeatherDataDays = cityWeatherData.data.map(day => {
        let forecastDay = new Forecast(day.datetime, `Low of ${day.low_temp} , High of ${day.max_temp} with  ${day.weather.description}`)

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
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}





