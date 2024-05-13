const { getAll, create, getOne, remove, update, setMovieActors, setMovieGenres, setMovieDirectors } = require('../controllers/movies.controllers');
const express = require('express');

const moviesRouter = express.Router();

moviesRouter.route('/movies')
    .get(getAll)
    .post(create);

moviesRouter.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

moviesRouter.route('/movies/:id/actors')
    .post(setMovieActors);

moviesRouter.route('/movies/:id/genres')
    .post(setMovieGenres);

moviesRouter.route('/movies/:id/directors')
    .post(setMovieDirectors);


module.exports = moviesRouter;