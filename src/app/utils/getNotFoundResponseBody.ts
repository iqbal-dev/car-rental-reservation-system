import httpStatus from 'http-status'; // Assuming you are using the 'http-status' module

export const getNotFoundResponseBody = <T>(
  entity: string = 'Data',
  data: [] | null = null,
) => ({
  statusCode: httpStatus.NOT_FOUND,
  message: `${entity} Not Found`,
  success: false,
  data: data,
});
