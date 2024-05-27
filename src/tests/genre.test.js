const request = require('supertest');
const app = require('../app');

let id;

test('GET /genres debe traer todos los géneros', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200); // tb
    expect(res.body).toBeInstanceOf(Array); // tbi
});

test('POST /genres debe crear un género', async () => {
    const body = {
        name: "Romantica"
    }
    const res = await request(app).post('/genres').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /genres/:id debe actualizar un género', async () => {
    const body = {
        name: 'romantica actualizado'
    }
    const res = await request(app).put(`/genres/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /genres/:id debe eliminar un género', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});
