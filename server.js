'use strict'
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');
const getRestaurants = require('./modules/restaurants')
require('dotenv').config();
const server = express();
server.use(cors());



const PORT = process.env.PORT;

server.get('/', (req, res) => {
    res.send('<h1>Welcome to the City Explorer Api</h1>');
})

server.get('/weather', getWeather);

server.get('/movies', getMovies);
server.get('/yelp', getRestaurants);



server.get('*', (req, res) => {
    try {} catch (error) {
        res.status(500).send(error)
    }
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
