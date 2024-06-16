export function calculateTimeDifferenceInHours(
  startTime: string,
  endTime: string,
): number {
  // Parse the times
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  // Check if the dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid time format. Please use HH:MM format.');
  }

  // Calculate the difference in milliseconds
  const diffInMilliseconds = end.getTime() - start.getTime();

  // Convert milliseconds to hours
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  return diffInHours;
}
