import { TUser } from './user.interface';
import User from './user.model';
/**
 * Service to create a user in the database.
 * @param payload - The user data to be created.
 * @returns The created user data.
 */
const createUserIntoDB = async (payload: TUser) => {
  // Create a new user document in the database using the provided payload.
  const result = await User.create(payload);

  // Return the newly created user data.
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
