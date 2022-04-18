/* eslint-disable @typescript-eslint/no-inferrable-types */

import app from '../../server';
import supertest from 'supertest';
import { UserSchema } from '../../types/user.type';
import { ProductSchema } from '../../types/product.type';

const request = supertest(app);

let token: string = '';
const id: number = 1;

describe('All Product operations', (): void => {
  const product = {
    name: 'iPhone 2022',
    price: '10000',
  } as ProductSchema;

  const user = {
    user_name: 'test6',
    first_name: 'test6',
    last_name: 'test6',
    email: 'test6@gmail.com',
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

  describe('Test Product CRUD API method', async (): Promise<void> => {
    it('should create new product', async (): Promise<void> => {
      const res = await request
        .post('/product')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(product);
      expect(res.status).toBe(200);
    });

    it('should get all products', async (): Promise<void> => {
      const res = await request.get('/product');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should get product by id', async (): Promise<void> => {
      const res = await request.get(`/product/${id}`);
      expect(res.status).toBe(200);
    });
  });
});
