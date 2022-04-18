/* eslint-disable @typescript-eslint/no-inferrable-types */
import supertest from 'supertest';
import app from '../../server';
import { UserSchema } from '../../types/user.type';

const request = supertest(app);

let token: string = '';
const id: number = 1;

describe('Test API Order methods', (): void => {
  const user = {
    user_name: 'test7',
    first_name: 'test7',
    last_name: 'test7',
    email: 'test7@gmail.com',
    password: '123456789',
  } as UserSchema;

  beforeAll(async (): Promise<void> => {
    const res = await request
      .post('/users')
      .set('content-type', 'application/json')
      .send(user);
    expect(res.status).toBe(201);
    const { token: user_token } = res.body.data;
    token = user_token;
  });

  describe('created method', async (): Promise<void> => {
    it('sould show all order by order id', async (): Promise<void> => {
      const res = await request
        .get(`/orders/${id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBeTruthy();
    });

    it('sould create new order by user id', async (): Promise<void> => {
      const res = await request
        .get(`/orders/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBeTruthy();
    });

    it('sould create new order by user id', async (): Promise<void> => {
      const res = await request
        .post(`/orders/${id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
