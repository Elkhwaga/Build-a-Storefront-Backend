import { authToken } from './../middleware/auth.middleware';
import express, { NextFunction, Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

export const dashboardRoutes = (app: express.Application) => {
  app.get('/users-with-orders', authToken, usersWithOrders);
  app.get('/products-in-orders', authToken, productsInOrders);
  app.get('/five-most-expensive', authToken, fiveMostExpensive);
};

const dashboard = new DashboardQueries();

const usersWithOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await dashboard.usersWithOrders();
    res.json({
      status: 'success',
      data: users,
      message: 'users with orders have been called successfully',
    });
  } catch (err) {
    next(err);
  }
};

const productsInOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await dashboard.productsInOrders();
    res.json({
      status: 'success',
      data: products,
      message: 'products with orders have been called successfully',
    });
  } catch (err) {
    next(err);
  }
};

const fiveMostExpensive = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await dashboard.fiveMostExpensive();
    res.json(users);
    res.json({
      status: 'success',
      data: users,
      message: 'five most expensive have been called successfully',
    });
  } catch (err) {
    next(err);
  }
};
