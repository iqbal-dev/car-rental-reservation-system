import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import Car from '../car/car.model';
import User from '../user/user.model';
import { TBooking } from './booking.interface';
import Booking from './booking.model';

/**
 * Service to create bookings
 * @param email - The email to find the user
 * @param payload - The payload to created
 * @returns created data
 */
const createBookingIntoDB = async (email: string, payload: TBooking) => {
  // Checking if the car exists by their custom ID
  const isCarExist = await Car.findOne({
    _id: payload.car,
    isDeleted: false,
  });
  if (!isCarExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
  }

  const isUserExistsByEmail = await User.findOne({ email });

  if (!isUserExistsByEmail) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isCarIsAlreadyExist = await Booking.isCarBooked(payload.car);
  if (isCarIsAlreadyExist) {
    throw new AppError(httpStatus.CONFLICT, 'Car is already booked');
  }

  //Create new booking
  const result = await Booking.create({
    ...payload,
    user: isUserExistsByEmail._id,
  });
  return result;
};

const getAllBookingFromDB = async (query: Record<string, unknown>) => {
  // Destructure carId and rename it to car
  const { carId, ...remainQuery } = query;

  // Initialize an object for the transformed query
  const transformedQuery = { ...remainQuery };

  // Add car to the transformed query only if carId is present
  if (carId) {
    transformedQuery.car = carId;
  }
  const modelQuery = new QueryBuilder(
    Booking.find().populate('car').populate('user'),
    transformedQuery,
  ).filter();
  const result = await modelQuery.modelQuery;
  return result;
};
const getAllBookingBYUserFromDB = async (email: string) => {
  const isUserExistsByEmail = await User.findOne({ email });
  if (!isUserExistsByEmail) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await Booking.find({ user: isUserExistsByEmail._id });
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getAllBookingBYUserFromDB,
};
