import movieService from "../services/movieService.js";

export async function isMovieCreator(req, res, next) {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    if (!req.isAuthenticated) {
        return res.redirect('/auth/login')
    }

    if (!movie.creator.equals(req.user.movieId)) {
        return res.status(401).render('404', { error: 'Only creator can editthis movie!'})
    }

    next();
}