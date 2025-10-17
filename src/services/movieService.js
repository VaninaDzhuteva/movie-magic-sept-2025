import Movie from "../models/Movies.js";

function getAll() {
    return Movie.find();
}

export default {
    getAll
}