import { UserSchema } from './../../types/user.type';
import { UserModel } from './../user.model';

const user_model: UserModel = new UserModel();

describe('All user operations', (): void => {
  describe('User Model', (): void => {
    it('should have a create user method', (): void => {
      expect(user_model.create).toBeDefined();
    });

    it('should have a get users method', (): void => {
      expect(user_model.index).toBeDefined();
    });

    it('should have a get user by id method', (): void => {
      expect(user_model.show).toBeDefined();
    });

    it('should have a update user method', (): void => {
      expect(user_model.update).toBeDefined();
    });

    it('should have a delete user method', (): void => {
      expect(user_model.destroy).toBeDefined();
    });

    describe('Test All user operations', (): void => {
      const user = {
        user_name: 'test2',
        first_name: 'test2',
        last_name: 'test2',
        email: 'test2@gmail.com',
        password: '123456789',
      } as UserSchema;

      beforeAll(async (): Promise<void> => {
        const result = await user_model.create(user);
        user.id = result.id;
      });

      it('The create method must return a new user', async (): Promise<void> => {
        const c_user = {
          user_name: 'test3',
          first_name: 'test3',
          last_name: 'test3',
          email: 'test3@gmail.com',
          password: '123456789',
        } as UserSchema;

        const create_user: UserSchema = await user_model.create(c_user);
        expect(create_user).toBeTruthy();
      });

      it('The method to get the users should return a list', async (): Promise<void> => {
        const get_users: UserSchema[] = await user_model.index();
        expect(get_users.length).toBeGreaterThan(0);
      });

      it('The method to get the user by id', async (): Promise<void> => {
        const get_user: UserSchema = await user_model.show(user.id as number);
        expect(get_user.id).toEqual(user.id as number);
      });

      it('The method to return the user update user', async (): Promise<void> => {
        const get_user: UserSchema = await user_model.update(
          user.id as number,
          {
            ...user,
            email: 'mohamedelsagheer@gmail.com',
          }
        );
        expect(get_user.email).toEqual('mohamedelsagheer@gmail.com');
      });
    });
  });
});
