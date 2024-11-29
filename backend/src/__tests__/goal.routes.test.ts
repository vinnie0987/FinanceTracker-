import request from 'supertest';
import app from '../server';

describe('Goal Routes', () => {
  let testGoalId: number;

  test('Should create a new goal', async () => {
    const response = await request(app)
      .post('/api/v1/goals')
      .send({
        title: 'Save for a car',
        targetAmount: 10000,
        dueDate: '2024-12-31',
        userId: 1, // Replace with a valid userId from your database
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('goal');
    testGoalId = response.body.goal.id;
  });

  test('Should fetch all goals', async () => {
    const response = await request(app).get('/api/v1/goals');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('Should fetch a single goal by ID', async () => {
    const response = await request(app).get(`/api/v1/goals/${testGoalId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('goal');
    expect(response.body.goal.id).toBe(testGoalId);
  });

  test('Should update a goal', async () => {
    const response = await request(app)
      .put(`/api/v1/goals/${testGoalId}`)
      .send({
        title: 'Save for a house',
        targetAmount: 20000,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Goal updated successfully');
  });

  test('Should delete a goal', async () => {
    const response = await request(app).delete(`/api/v1/goals/${testGoalId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Goal deleted successfully');
  });
});
