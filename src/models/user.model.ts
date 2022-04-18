/* eslint-disable @typescript-eslint/no-explicit-any */
import { hashPassword } from './../utils/hasPassword';
import { PoolClient, QueryResult } from 'pg';
import pool from '../database';
import { UserSchema } from '../types/user.type';
import bcrypt from 'bcrypt';
import config from '../config';

export class UserModel {
  table = 'users';

  // create
  async create(user: UserSchema): Promise<UserSchema> {
    const { user_name, first_name, last_name, email, password } = user;
    try {
      const conn: PoolClient = await pool.connect();
      const sql = `INSERT INTO ${this.table} (user_name, first_name, last_name, email, password_digest) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const result: QueryResult = await conn.query(sql, [
        user_name,
        first_name,
        last_name,
        email,
        hashPassword(password),
      ]);
      const row: any = result.rows[0];
      conn.release();
      return row;
    } catch (err) {
      throw new Error(`server error. ${err}`);
    }
  }

  // get all users
  async index(): Promise<UserSchema[]> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = `SELECT * FROM ${this.table}`;
      const result: QueryResult = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `An error occurred while communicating with users. ${err}`
      );
    }
  }

  // update
  async update(id: number, user: UserSchema): Promise<UserSchema> {
    const { user_name, first_name, last_name, email, password } = user;
    try {
      const conn: PoolClient = await pool.connect();
      const sql =
        'UPDATE users SET user_name = $1, first_name = $2, last_name = $3, email = $4, password_digest = $5 WHERE id = $6 RETURNING *';
      const result: QueryResult = await conn.query(sql, [
        user_name,
        first_name,
        last_name,
        email,
        hashPassword(password),
        id,
      ]);
      const row: any = result.rows[0];
      conn.release();
      return row;
    } catch (err) {
      throw new Error(`could not update user ${user_name}. ${err}`);
    }
  }

  // get user by id
  async show(id: number): Promise<UserSchema> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = `SELECT * FROM ${this.table} WHERE id = $1`;
      const result: QueryResult = await pool.query(sql, [id]);
      const row = result.rows[0];
      conn.release();
      return row;
    } catch (err) {
      throw new Error(`cloud not find user ${id}. ${err}`);
    }
  }

  // delete user by id
  async destroy(id: number): Promise<UserSchema> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`;
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cloud not find user ${id}. ${err}`);
    }
  }

  // authenticate user
  async authenticate(
    email: string,
    password: string
  ): Promise<UserSchema | null> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = 'SELECT password_digest FROM users WHERE email = $1';
      const result: QueryResult = await conn.query(sql, [email]);
      if (result.rows.length) {
        const user = result.rows[0];
        const isPasswordVaild = bcrypt.compareSync(
          `${password}${config.pepper}`,
          user.password_digest
        );
        if (isPasswordVaild) {
          const userInfo = await pool.query(
            'SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)',
            [email]
          );
          return userInfo.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Unable to login ${email}. ${err}`);
    }
  }
}
