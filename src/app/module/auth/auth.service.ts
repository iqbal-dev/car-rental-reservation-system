import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
const loginUser = async (payload: TLoginUser) => {
  console.log(payload);

  // Checking if the user exists by their custom ID
  const user = await User.isUserExistsByEmail(payload.email);

  // If user does not exist, throw a "Not Found" error
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // Checking if the provided password matches the stored password
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    // If the passwords do not match, throw a "Forbidden" error
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // Creating JWT payload with user's ID and role
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  // Creating an access token with the JWT payload, secret, and expiration configuration
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  // Creating a refresh token with the JWT payload, secret, and expiration configuration
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );
  // Returning the generated access and refresh tokens to the client
  return {
    refreshToken,
    accessToken,
    data: user,
  };
};

export const AuthServices = {
  loginUser,
};
