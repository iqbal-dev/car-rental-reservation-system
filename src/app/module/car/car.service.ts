import QueryBuilder from '../../builder/QueryBuilder';
import { carSearchAbleField } from './car.constant';
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
/**
 * Service to get all the cars from the database
 * @param query - The query string used to query the database
 * @returns All the cars from the database
 */
const getAllCarFromDB = async (query: Record<string, unknown>) => {
  // Get all cars from the database using the provided query.
  const queryBuilders = new QueryBuilder(Car.find(), query)
    .search(carSearchAbleField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await queryBuilders.modelQuery;
  // return the result
  return result;
};
/**
 * Service to get the data from database using ID
 * @param query - The query string used to query the database
 * @returns All the cars from the database
 */
const getCarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  // return the result
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
};
