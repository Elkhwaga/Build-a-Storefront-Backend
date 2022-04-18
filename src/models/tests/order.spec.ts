import { UserSchema } from './../../types/user.type';
import { ProductModel } from './../product.model';
import { UserModel } from './../user.model';
import { OrderModel } from './../order.model';
import { OrderSchema } from '../../types/order.type';
import { ProductSchema } from '../../types/product.type';
import { OrderProductSchema } from '../../types/orderProduct.type';

const order_model: OrderModel = new OrderModel();
const user_model: UserModel = new UserModel();
const product_model: ProductModel = new ProductModel();

describe('All Order operations', (): void => {
  it('should have a create order method', (): void => {
    expect(order_model.create).toBeDefined();
  });

  it('should have a get all orders', (): void => {
    expect(order_model.index).toBeDefined();
  });

  it('should have a get order by user id method', (): void => {
    expect(order_model.show).toBeDefined();
  });

  it('should have an add product', (): void => {
    expect(order_model.addProduct).toBeDefined();
  });

  describe('Test All Order operations', (): void => {
    const user = {
      user_name: 'test4',
      first_name: 'test4',
      last_name: 'test4',
      email: 'test4@gmail.com',
      password: '123456789',
    } as UserSchema;

    const product = {
      name: 'iPhone 2022',
      price: '10000',
    } as ProductSchema;

    beforeAll(async (): Promise<void> => {
      await user_model.create(user);
      await product_model.create(product);
    });

    it('sould create method new order', async (): Promise<void> => {
      const result: OrderSchema = await order_model.create(user.id as number);
      expect(result).toBeTruthy();
    });

    it('sould return all orders', async (): Promise<void> => {
      const result: OrderSchema[] = await order_model.index();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return add product in table products order', async (): Promise<void> => {
      const result: OrderProductSchema = await order_model.addProduct(
        10,
        1,
        product.id as number
      );
      expect(result).toBeTruthy();
    });
  });
});
