const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors debe traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200); // tb
    expect(res.body).toBeInstanceOf(Array); // tbi
});

test('POST /actors debe crear un actor', async () => {
    const body = {
        firstName: "Leonardo",
        lastName: "Di Caprio",
        nationality: "Estadounidense",
        image: "http://imagen.com",
        birthday: "1980-12-01"
    }
    const res = await request(app).post('/actors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('PUT /actors/:id debe actualizar un actor', async () => {
    const body = {
        firstName: 'Leonardo E'
    }
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE /actors/:id debe eliminar un género', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});
