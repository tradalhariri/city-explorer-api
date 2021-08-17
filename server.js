'use strict'
const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const server = express();
server.use(cors());


const PORT = process.env.PORT;

server.get('/', (req, res) => {
    res.send('<h1>Welcome to the City Explorer Api</h1>');
})

server.get('/weather', (req, res) => {

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
});

//https://api.themoviedb.org/3/search/movie?lat=31&lon=35&api_key=7010f81aa0a46441046dddc0b25efa75&query=amman
//https://api.themoviedb.org/3/search/movie?api_key=7010f81aa0a46441046dddc0b25efa75&query=amman

// https://image.tmdb.org/t/p/w500/vAc50GwRSaJ0CujLdLY7mKphAYY.jpg


server.get('/movies', (req, res) => {

    const cityName = req.query.searchQuery;
    const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.THE_MOVIE_DB_API_KEY}&query=${cityName}`;

    axios.get(movieURL).then((movies) => {
    
        let cityMovies = movies.data.results.map(movie => {
            let cityMovie = new Movie(movie);
            return cityMovie;
        })
        res.send(cityMovies)

    }).catch(error => {
        res.send(error)
    })
});


server.get('*', (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error)
    }

})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));



class Forecast {
    constructor(day) {

        this.date = day.datetime;
        this.description = `Low of ${day.low_temp} , High of ${day.max_temp} with  ${day.weather.description}`;
    }
}

class Movie {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.average_votes = movie.vote_average;
        this.total_votes = movie.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        this.popularity = movie.popularity;
        this.released_on = movie.release_date;
    }
}





//https://api.weatherbit.io/v2.0/current?&key=4983387c6e8540b59e85996da0cda8f2&include=minutely&city=amman

// https://api.weatherbit.io/v2.0/forecast/daily