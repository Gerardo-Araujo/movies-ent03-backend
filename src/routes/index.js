const express = require('express');
const genresRouter = require('./genres.router');
const actorsRouter = require('./actors.router');
const directorsRouter = require('./directors.router');
const moviesRouter = require('./movies.router');
const router = express.Router();

// colocar las rutas aquí
router.use(genresRouter)
router.use(actorsRouter)
router.use(directorsRouter)
router.use(moviesRouter)

module.exports = router;