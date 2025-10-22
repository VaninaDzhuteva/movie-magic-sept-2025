import { Schema, Types, model } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Movie title is required!'],
        minLength: [5, 'Title is too short!']
    },
    category: {
        type: String,
        required: [true, 'Movie category is required!'],
        enum: {
            values: ['tv-show', 'animation', 'movie', 'documentary', 'short-film']
        }
    },
    genre: {
        type: String,
        required: [true, 'Movie genre is required!'],
        minLength: [5, 'Movie genre is too short!'],
        match: [/ˆ[a-zA-Z0-9 ]+$/, 'Genre has some invalid characters!']
    },
    director: {
        type: String,
        required: [true, 'Movie director is required!'],
        minLength: [5, 'Movie director is too short!'],
        match: [/ˆ[a-zA-Z0-9 ]+$/, 'Director has some invalid characters!']
    },
    year: {
        type: Number,
        required: [true, 'Movie year is required!'],
        min: [1900, 'Movie year can`t be less than 1990!'],
        max: [2024, 'Movie year can`t be greater than 1990!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Movie image is required!'],
        match: [/ˆhttps?:\/\//, 'Image url is invalid!']
    },
    rating: {
        type: Number,
        required: [true, 'Movie rating is required!'],
        min: [1, 'Rating cannot be less than 1'],
        max: [10, 'Rating cannot be more than 10']
    },
    description: {
        type: String,
        required: [true, 'Movie Description is required!'],
        minLength: [20, 'Description should be at least 20 characters!'],
        match: [/ˆ[a-zA-Z0-9 ]+$/, 'Description has some invalid characters!']
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Movie should have director!']
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;