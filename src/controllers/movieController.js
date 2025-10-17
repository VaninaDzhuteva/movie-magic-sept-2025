import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get('/movies/create', (req, res) => {
    console.log(req.body);
    
    res.render('create');
});

movieController.post('/movies/create', (req, res) => {
    console.log(req.body);

    movieService.create(req.body);

    res.end();
});

export default movieController;