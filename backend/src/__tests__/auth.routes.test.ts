import request from 'supertest';
import app from '../server'; // Import the Express app

describe('Auth Routes', () => {
  let userEmail: string;

  beforeAll(() => {
    userEmail = `testuser${Date.now()}@example.com`; // Unique email for testing
  });

  test('Should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'TestUser',
        email: userEmail,
        password: 'testPassword123',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user).toHaveProperty('id');
  });

  test('Should fail to register an existing user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'TestUser',
        email: userEmail,
        password: 'testPassword123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  test('Should log in a user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: userEmail,
        password: 'testPassword123',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged in successfully');
    expect(response.body).toHaveProperty('token');
  });

  test('Should fail login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: userEmail,
        password: 'wrongPassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  test('Should log out a user', async () => {
    const response = await request(app).post('/api/v1/auth/logout');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged out successfully');
  });
});
