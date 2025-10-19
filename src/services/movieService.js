import Movie from "../models/Movie.js";

async function getAll(filter) {
    // const result = await Movie.find(filter).lean();
    const result = await Movie.find(filter);
    return result;
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