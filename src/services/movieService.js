import Movie from "../models/Movie.js";

function getAll(filter) {
    return Movie.find(filter);
}

function getOne(movieId) {
    return Movie.findOne({ _id: movieId });
}

function create(movieData) {
    movieData.rating = Number(movieData.rating);
    const movie = new Movie(movieData);
    return movie.save();
}


export default {
    getAll, create, getOne
}