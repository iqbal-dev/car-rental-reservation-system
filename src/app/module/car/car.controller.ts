import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { getNotFoundResponseBody } from '../../utils/getNotFoundResponseBody';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';
/**
 * Controller to create a new car using car create service
 */
const createCar = catchAsync(async (req, res) => {
  //extract payload from request body
  const payload = req.body;
  //create a new car in the database using the extracted payload
  const result = await CarServices.createCarIntoDB(payload);
  //send a response back to the client indicating that the car was created successfully
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Car was created successfully',
    success: true,
    data: result,
  });
});
/**
 * Controller to get all cars from the database
 */
const getAllCar = catchAsync(async (req, res) => {
  //extract query from query
  const query = req.query;
  // get all cars from the database using service
  const result = await CarServices.getAllCarFromDB(query);
  // check if the result is found or not , if not found then return error
  if (!result?.length) {
    sendResponse(res, getNotFoundResponseBody('Car', []));
    return;
  }
  //send a response back to the
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Car was retrieve successfully',
    success: true,
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCar,
};
