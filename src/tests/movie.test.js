const request = require('supertest');
const app = require('../app');
const Genres = require('../models/Genres');
const Directors = require('../models/Directors');
const Actors = require('../models/Actors');

let id;

test('GET /movies debe traer todos las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200); // tb
    expect(res.body).toBeInstanceOf(Array); // tbi
});

test('POST /movies debe crear una pelicula', async () => {
    const body = {
        name: "Titanic",
        image: "http://imagenes.com",
        synopsis: "Drama",
        releaseYear: 2000,
    }
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /movies/:id debe actualizar una pelicula', async () => {
    const body = {
        name: 'TITANIC actualizado'
    }
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});


test('POST /movies/:id/genres debe insertar los géneros de una pelicula', async () => {
    const genre = await Genres.create(
        { name: 'Suspenso' });
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Suspenso');
});


test('POST /movies/:id/actors debe insertar los Actores de una pelicula', async () => {
    const actor = await Actors.create({
         firstName: 'Brus',
         lastName: 'lee',
         nationality: 'chino',
         image: 'http://imagen.com',
         birthday: '2000-12-12'
        });
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe('Brus');
});


test('POST /movies/:id/directors debe insertar los Directores de una pelicula', async () => {
    const directors = await Directors.create({ 
        firstName: 'Pedro',
        lastName:  'Ramirez',
        nationality: 'Estadounidense',
        image: 'http://imagen.com',
        birthday: 2002,        
         });
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([directors.id]);
    await directors.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe('Pedro');
});


test('DELETE /movies/:id debe eliminar una pelicula', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});
