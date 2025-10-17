import Movie from "../models/Movies.js";

function getAll() {
    return Movie.find();
}

function create(movieData) {
   
}   


export default {
    getAll, create
}