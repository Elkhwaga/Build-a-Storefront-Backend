import { ProductModel } from './../models/product.model';
import { Request, Response, NextFunction, Application } from 'express';
import { ProductSchema } from '../types/product.type';
import { authToken } from '../middleware/auth.middleware';

const product_model = new ProductModel();

export const productRoutes = (app: Application): void => {
  app.route('/product').post(authToken, create).get(index);
  app.get('/product/:id', show);
};

// create product
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = req.body;
    if (!body) {
      throw new Error('Please fill all input');
    }
    if (body.desc < 20) {
      throw new Error('Description must be 20 characters or more');
    }
    const products: ProductSchema = await product_model.create(body);
    res.json({
      status: 'success',
      data: { ...products },
      message: 'product created successfully',
    });
  } catch (err) {
    next(err);
  }
};

// get all products
export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product: ProductSchema[] = await product_model.index();
    res.json({
      status: 'success',
      data: product,
      message: 'product have been called successfully',
    });
  } catch (err) {
    next(err);
  }
};

// get product by id
const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send();
    const product: ProductSchema = await product_model.show(id);
    if (!product) res.status(204);
    res.json({
      status: 'success',
      data: product,
      message: 'product have been called successfully',
    });
  } catch (error) {
    next(error);
  }
};
