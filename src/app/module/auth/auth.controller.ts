import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from '../user/user.service';

/**
 * Controller to handle user signup requests.
 * @param req - The request object containing user data in the body.
 * @param res - The response object to send the response to the client.
 */
const signupUser = catchAsync(async (req, res) => {
  // Extract the user data from the request body
  const payload = req.body;

  // Create a new user in the database using the extracted payload and services
  const result = await UserServices.createUserIntoDB(payload);

  // Send a response back to the client indicating that the user was registered successfully
  sendResponse(res, {
    statusCode: httpStatus.CREATED, // Set the status code to 201 (Created)
    success: true, // Indicate that the request was successful
    message: 'User registered successfully', // Success message
    data: result, // Include the created user data in the response
  });
});

export const AuthServices = {
  signupUser,
};
