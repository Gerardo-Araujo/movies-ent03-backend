const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors debe traer todos los Directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200); // tb
    expect(res.body).toBeInstanceOf(Array); // tbi
});

test('POST /directors debe crear un Director', async () => {
    const body = {
        firstName: "James",
        lastName: "Cameron",
        nationality: "Estadounidense",
        image: "http://imagen.com",
        birthday: "1954-08-16"
    }
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('PUT /directors/:id debe actualizar un Director', async () => {
    const body = {
        firstName: 'James F'
    }
    const res = await request(app).put(`/directors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE /directors/:id debe eliminar un género', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});
