import { authToken } from './../middleware/auth.middleware';
import { Application, Response, Request, NextFunction } from 'express';
import pool from '../database';
import { UserModel } from '../models/user.model';
import { UserSchema } from '../types/user.type';
import { QueryResult } from 'pg';
import jwt from 'jsonwebtoken';
import config from '../config';

const user_model = new UserModel();
export const userRoutes = (app: Application): void => {
  app.route('/users').post(create).get(authToken, index);
  app
    .route('/users/:id')
    .put(authToken, update)
    .get(authToken, show)
    .delete(authToken, destroy);

  app.post('/users/auth', authToken, authenticate);
};

// create user
const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const user = req.body;
    if (!user) {
      return res.status(401).json('Please fill all input');
    }
    if (user.user_name.length < 3) {
      return res.status(401).json('The user name must be 3 characters or more');
    }
    if (user.password.length < 7) {
      return res.status(401).json('The password must be 8 characters or more');
    }
    if (user.email === '') {
      res.status(401).json('Plase enter your email');
    }
    const sql = 'SELECT * FROM users WHERE email = $1';
    const result: QueryResult = await pool.query(sql, [user.email]);
    if (result.rows.length !== 0) {
      return res.json('User already exist');
    }
    const new_user: UserSchema = await user_model.create(user);
    const token = jwt.sign(
      { new_user },
      config.token_secret as unknown as string
    );
    res.status(201).json({
      status: 'success',
      data: { ...new_user, token },
      message: 'user created successfully',
    });
  } catch (err) {
    next(err);
  }
};

// get all users
const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: UserSchema[] = await user_model.index();
    res.json({
      status: 'success',
      data: users,
      message: 'Users have been called successfully',
    });
  } catch (err) {
    next(err);
  }
};

// update
const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send();
    const user_id: UserSchema = await user_model.show(id);
    if (!user_id) {
      return res.status(401).json({
        status: 'error',
        message: `No user found with id`,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = req.body;
    const new_user: UserSchema = await user_model.update(id, body);
    res.json({
      status: 'success',
      data: new_user,
      message: 'users updated successfully',
    });
  } catch (error) {
    return next(error);
  }
};
// get user by id
const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send();
    const user: UserSchema = await user_model.show(id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        data: user,
        message: `No user found with id: ${id}`,
      });
    }
    res.json({
      status: 'success',
      data: user,
      message: 'Users have been called successfully',
    });
  } catch (error) {
    next(error);
  }
};

// delete user by id
const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send();
    const user_id: UserSchema = await user_model.show(id);
    if (!user_id) {
      return res.status(401).json({
        status: 'error',
        message: `No user found with id`,
      });
    }
    const user = await user_model.destroy(id);
    return res.json({
      status: 'success',
      data: user,
      message: 'users deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// authenticate user
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user: UserSchema | null = await user_model.authenticate(
      email,
      password
    );
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'the username and password do not match plase try again',
      });
    }
    return res.json({
      status: 'success',
      data: { ...user },
      message: 'user authenticated successfully',
    });
  } catch (error) {
    return next(error);
  }
};
