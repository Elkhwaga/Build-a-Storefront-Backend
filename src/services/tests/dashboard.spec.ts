import { DashboardQueries } from '../dashboard';
import { UserSchema } from '../../types/user.type';
import { ProductSchema } from '../../types/product.type';
import { OrderModel } from '../../models/order.model';
import { UserModel } from '../../models/user.model';
import { ProductModel } from '../../models/product.model';

const order_model: OrderModel = new OrderModel();
const user_model: UserModel = new UserModel();
const product_model: ProductModel = new ProductModel();
const dashboard: DashboardQueries = new DashboardQueries();

describe('All Dashboard operations', (): void => {
  it('should have a usersWithOrders method', (): void => {
    expect(dashboard.usersWithOrders).toBeDefined();
  });

  it('should have a productsInOrders method', (): void => {
    expect(dashboard.productsInOrders).toBeDefined();
  });

  it('should have a fiveMostExpensive method', (): void => {
    expect(dashboard.fiveMostExpensive).toBeDefined();
  });

  describe('Test All Dashboard operations', () => {
    beforeAll(async (): Promise<void> => {
      const user: UserSchema = await user_model.create({
        user_name: 'ali khaled',
        first_name: 'mohamed',
        last_name: 'khaled',
        email: 'ali@gmail.com',
        password: '123456789',
      });
      const product: ProductSchema = await product_model.create({
        name: 'iPhone 2022',
        price: '10000',
      });
      await order_model.create(user.id as number);
      await order_model.addProduct(10, 1, product.id as number);
    });

    it('Test method productsInOrders', async (): Promise<void> => {
      const result: {
        firstName: string;
        lastName: string;
      }[] = await dashboard.usersWithOrders();
      expect(result).toBeTruthy();
    });

    it('Test method productsInOrders', async (): Promise<void> => {
      const result: {
        name: string;
        price: number;
        order_id: string;
      }[] = await dashboard.productsInOrders();
      expect(result).toBeTruthy();
    });

    it('Test method fiveMostExpensive', async (): Promise<void> => {
      const result: {
        name: string;
        price: number;
      }[] = await dashboard.fiveMostExpensive();
      expect(result).toBeTruthy();
    });
  });
});
