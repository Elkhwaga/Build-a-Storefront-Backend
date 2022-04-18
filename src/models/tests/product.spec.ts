import { ProductModel } from './../product.model';
import { ProductSchema } from './../../types/product.type';

const product_model: ProductModel = new ProductModel();

describe('All Product operations', (): void => {
  it('should have a create product method', (): void => {
    expect(product_model.create).toBeDefined();
  });

  it('should have a get product by id method', (): void => {
    expect(product_model.show).toBeDefined();
  });

  it('should have a get products method', (): void => {
    expect(product_model.index).toBeDefined();
  });

  describe('Test All Product operations', (): void => {
    const product = {
      name: 'iPhone 2022',
      price: '10000',
    } as ProductSchema;

    beforeAll(async () => {
      const result = await product_model.create(product);
      product.id = result.id;
    });

    it('create method sould return new product', async (): Promise<void> => {
      const c_product = {
        name: 'iPhone 2022',
        price: '10000',
      } as ProductSchema;

      const create_product: ProductSchema = await product_model.create(
        c_product
      );
      expect(create_product).toBeTruthy();
    });

    it('index method should return a list', async (): Promise<void> => {
      const get_products: ProductSchema[] = await product_model.index();
      expect(get_products.length).toBeGreaterThan(0);
    });

    it('show method should return the correct model', async (): Promise<void> => {
      const get_product: ProductSchema = await product_model.show(
        product.id as number
      );
      expect(get_product.id).toEqual(product.id as number);
    });
  });
});
