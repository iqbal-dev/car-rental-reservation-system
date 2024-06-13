import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
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

export const CarControllers = {
  createCar,
};
