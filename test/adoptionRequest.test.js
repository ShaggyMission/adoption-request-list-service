const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Asegúrate que exporte la app express
const AdoptionRequest = require('../models/adoptionRequest.model');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  await AdoptionRequest.deleteMany({});

  await AdoptionRequest.create([
    { userId: 'user1', petId: 'pet1', message: 'I love this dog' },
    { userId: 'user2', petId: 'pet2' },
    { userId: 'user3', petId: 'pet3', status: 'approved' },
  ]);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('GET /list/adoption-requests', () => {
  it('should list adoption requests paginated', async () => {
    const res = await request(app).get('/list/adoption-requests?page=1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('currentPage', 1);
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('totalRequests');
    expect(Array.isArray(res.body.requests)).toBe(true);
    expect(res.body.requests.length).toBeGreaterThan(0);
  });

  it('should default to page 1 if page query is invalid', async () => {
    const res = await request(app).get('/list/adoption-requests?page=invalid');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('currentPage', 1);
  });
});
