import { TCar } from './car.interface';
import Car from './car.model';

/**
 * Service to create a new car into database
 * @param payload - The payload to be create
 * @returns Created car data
 */
const createCarIntoDB = async (payload: TCar) => {
  // Create a new car document in the database using the provided payload.
  const result = await Car.create(payload);

  // Return the newly created car data.
  return result;
};

export const CarServices = {
  createCarIntoDB,
};
