import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { getNotFoundResponseBody } from '../../utils/getNotFoundResponseBody';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  // extract email from request user;
  const { email } = req.user;
  //extract payload from request body;
  const payload = req.body;
  //Using service create new booking;
  const result = await BookingServices.createBookingIntoDB(email, payload);
  //send response to client;
  sendResponse(res, {
    message: 'Create booking successfully',
    statusCode: httpStatus.CREATED,
    success: true,
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await BookingServices.getAllBookingFromDB(query);
  if (!result.length) {
    sendResponse(res, getNotFoundResponseBody('Booking', []));
    return;
  }
  sendResponse(res, {
    message: 'Get all bookings successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});
const getAllBookingsByUser = catchAsync(async (req, res) => {
  const { email } = req.user;
  console.log('🚀 ~ getAllBookingsByUser ~ email:', email);
  const result = await BookingServices.getAllBookingBYUserFromDB(email);
  if (!result.length) {
    sendResponse(res, getNotFoundResponseBody('Booking', []));
    return;
  }
  sendResponse(res, {
    message: 'Get all bookings successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getAllBookingsByUser,
};
