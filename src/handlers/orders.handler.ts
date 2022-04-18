import { OrderModel } from './../models/order.model';
import { Request, Response, NextFunction, Application } from 'express';
import { authToken } from '../middleware/auth.middleware';

const order_model = new OrderModel();

export const orderRoutes = (app: Application): void => {
  app.get('/orders', authToken, index);
  app.get('/orders/:id', authToken, show);
  app.post('/orders/:userId', authToken, create);
  // add product
  app.post('/orders/:id/products', authToken, addProduct);
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await order_model.show(req.params.id);
    res.json({
      status: 'success',
      data: order,
      message: 'product have been called successfully',
    });
  } catch (err) {
    next(err);
  }
};

const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await order_model.index();
    res.json({
      status: 'success',
      data: order,
      message: 'product have been called successfully',
    });
  } catch (err) {
    next(err);
  }
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const created = await order_model.create(parseInt(req.params.userId));
    res.json({
      status: 'success',
      data: created,
      message: 'product have been called successfully',
    });
  } catch (err) {
    next(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const order = await order_model.addProduct(
      req.body.quantity,
      Number(req.params.id),
      req.body.product_id
    );
    res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};
