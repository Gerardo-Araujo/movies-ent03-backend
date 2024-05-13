const { getAll, create, getOne, remove, update } = require('../controllers/genres.controllers');
const express = require('express');

const genresRouter = express.Router();

genresRouter.route('/genres')
    .get(getAll)
    .post(create);

genresRouter.route('/genres/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = genresRouter;