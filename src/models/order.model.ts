/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderProductSchema } from './../types/orderProduct.type';
import { QueryResult, PoolClient } from 'pg';
import pool from '../database';
import { OrderSchema } from './../types/order.type';
export class OrderModel {
  table = 'orders';

  async create(userId: number): Promise<OrderSchema> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
      const result: QueryResult = await conn.query(sql, [userId]);
      const row: any = result.rows[0];
      conn.release();
      return row;
    } catch (err) {
      throw new Error(`could not add a new row ${userId}. ${err}`);
    }
  }

  async index(): Promise<OrderSchema[]> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = `SELECT * FROM ${this.table}`;
      const result: QueryResult = await conn.query(sql);
      const row: any[] = result.rows;
      conn.release();
      return row;
    } catch (err) {
      throw new Error(`Could not get. ${err}`);
    }
  }

  async show(id: string): Promise<OrderSchema> {
    try {
      const conn: PoolClient = await pool.connect();
      const sql = `SELECT * FROM ${this.table} WHERE id = $1`;
      const result: QueryResult = await conn.query(sql, [id]);
      const row: any = result.rows[0];
      conn.release();
      return row;
    } catch (err) {
      throw new Error(`Could not find id ${id}. ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<OrderProductSchema> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await pool.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
