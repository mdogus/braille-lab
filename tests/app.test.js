// tests/app.test.js
const request = require('supertest');
const http    = require('http');
const app     = require('../app');

describe('Express Uygulaması Ana Testleri', () => {
  let server;

  // Testlerden önce sunucuyu ayağa kaldır
  beforeAll((done) => {
    server = http.createServer(app).listen(done);
  });

  // Testler bittiğinde kapat
  afterAll((done) => {
    server.close(done);
  });

  it('GET / → 200 ve HTML içermeli', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  it('GET /users → 200 ve HTML içermeli', async () => {
    const res = await request(server).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  it('GET /brtyper → 200 dönmeli', async () => {
    const res = await request(server).get('/brtyper');
    expect(res.statusCode).toBe(200);
  });

  it('GET /brreader → 200 dönmeli', async () => {
    const res = await request(server).get('/brreader');
    expect(res.statusCode).toBe(200);
  });

  it('GET /about → 200 dönmeli', async () => {
    const res = await request(server).get('/about');
    expect(res.statusCode).toBe(200);
  });

  it('GET /contact → 200 dönmeli', async () => {
    const res = await request(server).get('/contact');
    expect(res.statusCode).toBe(200);
  });

  it('Bilinmeyen rota → 404 dönmeli', async () => {
    const res = await request(server).get('/nonexistent-route');
    expect(res.statusCode).toBe(404);
  });
});
