import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = Router();

// Create movie show page
movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create', { pageTitle: 'Create Movie' });
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

        res.status(400).render('movie/create', { error: errorMessage, movie: movieData });
    }

});

//Show details page
movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOneDetailed(movieId);
    //const movieCasts = await castService.getAll({includes: movie.casts});

    const ratingViewData = '&#x2605;'.repeat(Math.trunc(movie.rating));

    const isCreator = movie.creator && movie.creator.equals(req.user?.id);

    res.render('movies/details', { movie, rating: ratingViewData, isCreator });
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
movieController.get('/:movieId/edit', async function (req, res) {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    console.log(movie);

    const categoriesViewData = getMovieCategoryViewData(movie.category);
    console.log(categoriesViewData);


    res.render('movies/edit', { movie, categories: categoriesViewData });
});

// Edit movie action
movieController.post('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    await movieService.edit(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`);
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