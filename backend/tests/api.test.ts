import request from 'supertest';
import app from '../app.js';
import { sequelize } from '../models/index.js';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset database before tests
});

afterAll(async () => {
  await sequelize.close();
});

describe('API Flow: User -> Entity -> Association', () => {
  let userId: number;
  let entityId: number;

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('testuser');
    userId = res.body.id;
  });

  it('should create a new entity', async () => {
    const res = await request(app)
      .post('/api/entities')
      .send({
        name: 'Test Entity'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('Test Entity');
    entityId = res.body.id;
  });

  it('should associate the entity to the user', async () => {
    const res = await request(app)
      .post(`/api/users/${userId}/entities/${entityId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Entity added to user successfully');
  });

  it('should fetch the user with their associated entities', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('Entities');
    expect(res.body.Entities.length).toBeGreaterThan(0);
    expect(res.body.Entities[0].id).toEqual(entityId);
  });
});
