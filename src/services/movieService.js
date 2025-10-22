import Movie from "../models/Movie.js";

function getAll(filter = {}) {
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

function getOneDetailed(movieId) {
  return this.getOne(movieId).populate('casts');
}

function create(movieData, userId) {
    // Mongoose
    return Movie.create({
      ...movieData,
      rating: Number(movieData.rating),
      creator: userId
    });
}

async function attach(movieId, castId) {
  // const movie = await Movie.findById(movieId);
  // movie.casts.push(castId);
  // return movie.save();

  // Add relation with MongoDB
  return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});
}

function deleteMovie (movieId) {
  return Movie.findByIdAndDelete(movieId);
}

function edit(movieId, movieData) {
    return Movie.findByIdAndUpdate(movieId, movieData);
}

export default {
    getAll, create, getOne, attach, edit, getOneDetailed, deleteMovie
}