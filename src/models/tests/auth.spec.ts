/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserSchema } from '../../types/user.type';
import { UserModel } from './../user.model';

const user_model: UserModel = new UserModel();

describe('authenticate user', (): void => {
  it('should have authenticate user model', (): void => {
    expect(user_model.authenticate).toBeDefined();
  });
  const user = {
    user_name: 'mohamed khaled',
    first_name: 'mohamed',
    last_name: 'khaled',
    email: 'mohamed@gmail.com',
    password: '123456789',
  } as UserSchema;

  it('should return the authenticated user', async (): Promise<void> => {
    await user_model.create(user);
    const auth_user: any = await user_model.authenticate(
      user.email,
      user.password
    );
    expect(auth_user.email).toBe(user.email);
  });
});
