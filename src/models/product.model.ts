/* eslint-disable @typescript-eslint/no-explicit-any */
import { PoolClient, QueryResult } from 'pg';
import pool from '../database';
import { ProductSchema } from '../types/product.type';

export class ProductModel {
  table = 'products';

  // create product
  async create(product: ProductSchema): Promise<ProductSchema> {
    try {
      const { name, price } = product;
      const conn: PoolClient = await pool.connect();
      const sql = `INSERT INTO ${this.table} (name, price) VALUES($1, $2) RETURNING *`;
      const result: QueryResult = await conn.query(sql, [name, price]);
      const row: any = result.rows[0];
      conn.release();
      return row;
    } catch (err) {
      throw new Error(`could not create product. ${err}`);
    }
  }

  // get all products
  async index(): Promise<ProductSchema[]> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = `SELECT * FROM ${this.table}`;
      const result: QueryResult = await conn.query(sql);
      const row: any[] = result.rows;
      conn.release();
      return row;
    } catch (err) {
      throw new Error(`could not get all products. ${err}`);
    }
  }

  // get product by id
  async show(id: number): Promise<ProductSchema> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = `SELECT * FROM ${this.table} WHERE id = $1`;
      const result: QueryResult = await conn.query(sql, [id]);
      const row: any = result.rows[0];
      conn.release();
      return row;
    } catch (err) {
      throw new Error(`could not get product by id ${id}. ${err}`);
    }
  }
}
