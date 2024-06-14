import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
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
  // Get  car from the database by id.
  const result = await Car.findById(id);
  // check if the result is found or not, if not found then throw error
  if (!result) {
    throw new AppError(404, 'Car not found');
  }
  // return the result
  return result;
};

/**
 * Service to update data into database
 * @param id - The id of the car to update data
 * @param payload - The data to be updated
 * @returns updated data
 */
const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const { features, ...remainingCarData } = payload;
  const result = await Car.findByIdAndUpdate(
    id,
    {
      ...remainingCarData,
      $addToSet: { features: { $each: features } },
    },
    { upsert: true, new: true, runValidators: true },
  );

  return result;
};
const deleteCarIntoDB = async (id: string) => {
  const result = await Car.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      isDeleted: true,
    },
    { new: true, runValidators: true },
  );
  if (!result) {
    throw new AppError(404, 'Car not found');
  }

  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getCarFromDB,
  updateCarIntoDB,
  deleteCarIntoDB,
};
