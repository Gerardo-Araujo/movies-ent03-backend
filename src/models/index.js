const Actors = require("./Actors");
const Directors = require("./Directors");
const Genres = require("./Genres");
const Movies = require("./Movies");


Movies.belongsToMany(Actors, { through: 'movies_actors'});
Actors.belongsToMany(Movies, { through: 'movies_actors'});

Movies.belongsToMany(Directors, { through: 'movies_directors'});
Directors.belongsToMany(Movies,  { through: 'movies_directors'});

Movies.belongsToMany(Genres, { through:  'movies_genres'});
Genres.belongsToMany(Movies, { through:  'movies_genres'});


