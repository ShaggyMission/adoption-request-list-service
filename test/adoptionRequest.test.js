const request = require('supertest');
const app = require('../app');
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const AdoptionRequest = require('../models/adoptionRequest.model');

beforeAll(async () => {
  await connectDB();
  await AdoptionRequest.deleteMany({});
  // Insert some dummy data
  await AdoptionRequest.create([
    { userId: 'user1', petId: 'pet1', message: 'I love this dog' },
    { userId: 'user2', petId: 'pet2' },
    { userId: 'user3', petId: 'pet3', status: 'approved' },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /adoption-requests', () => {
  it('should list adoption requests paginated', async () => {
    const res = await request(app).get('/adoption-requests?page=1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('currentPage', 1);
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('totalRequests');
    expect(Array.isArray(res.body.requests)).toBe(true);
    expect(res.body.requests.length).toBeGreaterThan(0);
  });

  it('should default to page 1 if page query is invalid', async () => {
    const res = await request(app).get('/adoption-requests?page=invalid');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('currentPage', 1);
  });
});
