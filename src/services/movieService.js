import Movie from "../models/Movies.js";

function getAll() {
    return Movie.find();
}

function getOne(movieId) {
    return Movie.find({_id: movieId});
}

function create(movieData) {
   const movie = new Movie(movieData);
   return movie.save();
}   


export default {
    getAll, create, getOne
}