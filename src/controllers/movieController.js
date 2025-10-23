import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isMovieCreator } from "../middlewares/movieMiddleware.js";

const movieController = Router();

// Create movie show page
movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create', { pageTitle: 'Create Movie', categories: getMovieCategoryViewData() });
});

// Create movie action
movieController.post('/create', isAuth, async (req, res) => {
    const movieData = req.body;
    const userId = req.user.id;

    try {
        await movieService.create(movieData, userId);

        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        const categoriesViewData = getMovieCategoryViewData(movieData.category);
        console.log(movieData.category);

        console.log(categoriesViewData);

        res.status(400).render('movies/create', {
            error: errorMessage,
            movie: movieData,
            categories: categoriesViewData
        });
    }

});

//Show details page
movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    //const movieCasts = await castService.getAll({includes: movie.casts});

    try {
        const movie = await movieService.getOneDetailed(movieId);

        const ratingViewData = '&#x2605;'.repeat(Math.trunc(movie.rating));

        const isCreator = movie.creator && movie.creator.equals(req.user?.id);

        res.render('movies/details', { movie, rating: ratingViewData, isCreator });
    } catch (err) {
        // 01
        //res.redirect('/404');

        // 02
        res.render('404', { error: 'Movie not found!' });
    }
});

// Show search page
movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter, pageTitle: 'Search Movies' });
});

// Show attach page
movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({ excludes: movie.casts });

    res.render('casts/attach', { movie, casts });
});

// Attach cast action
movieController.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

// Check if logged user is creator and if yes delete movie
movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    if (!movie.creator?.equals(req.user.id)) {
        return res.redirect('/');
    }

    await movieService.deleteMovie(movieId);

    res.redirect('/');
});

// Show edit page
movieController.get('/:movieId/edit', isAuth, isMovieCreator, async function (req, res) {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getOne(movieId);
        
        // Validate if user is creator
        // if (movie.creator.toString() !== req.user.id) {
        //     res.redirect(`/movies/${movieId}/details`, { error: 'Only creator can edit this movie!'});
        // }
        const categoriesViewData = getMovieCategoryViewData(movie.category);

        res.render('movies/edit', { movie, categories: categoriesViewData });
    } catch (err) {
        res.render('404', { error: 'Movie not found!' });
    }
});

// Edit movie action
movieController.post('/:movieId/edit', isAuth, isMovieCreator, async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    try {
        await movieService.edit(movieId, movieData);

        res.redirect(`/movies/${movieId}/details`);
    } catch (err) {
        res.status(400).render('movies/edit', {
            error: getErrorMessage(err),
            movie: movieData,
            categories: getMovieCategoryViewData(movieData.category)
        });
    }
});

function getMovieCategoryViewData(selectedCategory) {
    const categories = [
        { value: 'tv-show', label: 'TV Show' },
        { value: 'animation', label: 'Animation' },
        { value: 'movie', label: 'Movie' },
        { value: 'documentary', label: 'Documentary' },
        { value: 'short-film"', label: 'Short Film' },
    ];

    const viewData = categories.map(category => ({ ...category, selected: selectedCategory === category.value ? 'selected' : '' }));

    return viewData;
}

export default movieController;