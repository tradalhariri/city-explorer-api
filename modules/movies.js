'use strict'
const caching = require('./caching');

const axios = require('axios');

const getMovies = (req, res) => {

    const cityName = req.query.searchQuery;
    const cityNameMovies = `movies-${cityName}`;
    const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.THE_MOVIE_DB_API_KEY}&query=${cityName}`;

    if(caching[cityNameMovies]!== undefined){
        res.send(caching[cityNameMovies]);
    }else{

        axios.get(movieURL).then((movies) => {

            let cityMovies = movies.data.results.map(movie => {
                let cityMovie = new Movie(movie);
                return cityMovie;
            })
            caching[cityNameMovies] = cityMovies;
            res.send(cityMovies);
    
        }).catch(error => {
            res.send(error)
        })

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

module.exports = getMovies;

