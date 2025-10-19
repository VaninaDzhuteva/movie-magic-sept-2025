import { log } from "console";
import Movie from "../models/Movie.js";

function getAll(filter) {
    // const result = await Movie.find(filter).lean();
    let query = Movie.find();

    if (filter.title) {
      // Partial match,case insensitive
      query = query.find({title: { $regex: filter.title, $options: 'i'}});
    }

    if (filter.genre) {
      // exact match,case insensitive
      query = query.find({genre: { $regex: new RegExp(`ˆ${filter.genre}$`), $options: 'i'}});
    }

    if (filter.year) {
      // exact match,case insensitive
      query = query.where('year').equals(filter.year);
    }

    return query;
}

function getOne(movieId) {
    //return Movie.findOne({ _id: movieId });
    return Movie.findById(movieId);
}

function create(movieData) {
    movieData.rating = Number(movieData.rating);

    // const movie = new Movie(movieData);
    // return movie.save();

    // Mongoose
    return Movie.create(movieData);
}


export default {
    getAll, create, getOne
}