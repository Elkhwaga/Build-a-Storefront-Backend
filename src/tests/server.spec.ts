import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('test basic endpoint server', (): void => {
  it('server running', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
