/* eslint-disable @typescript-eslint/no-inferrable-types */
import app from '../../server';
import supertest from 'supertest';
import { UserSchema } from './../../types/user.type';

const request = supertest(app);

let token: string = '';
const id: number = 1;

describe('Test User CRUD API method', (): void => {
  const user = {
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    email: 'test@gmail.com',
    password: '123456789',
  } as UserSchema;

  describe('test auth method', async (): Promise<void> => {
    describe('Test User CRUD API method', async (): Promise<void> => {
      it('should create new user', async (): Promise<void> => {
        const res = await request
          .post('/users')
          .set('content-type', 'application/json')
          .send(user);
        expect(res.status).toBe(201);
        const { token: user_token } = res.body.data;
        token = user_token;
      });

      it('should be able to auth to get token', async (): Promise<void> => {
        const res = await request
          .post('/users/auth')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            email: 'test@gmail.com',
            password: '123456789',
          });
        expect(res.status).toBe(200);
      });
    });

    it('should get all users', async (): Promise<void> => {
      const res = await request
        .get('/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should get user by id', async (): Promise<void> => {
      const res = await request
        .get(`/users/${id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should update user by id', async (): Promise<void> => {
      const res = await request
        .put(`/users/${id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...user,
          email: 'kahled@gmail.com',
        });
      expect(res.status).toBe(200);
    });
  });
});
