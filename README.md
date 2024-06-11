# Project Description

Imagine you own a car rental business. To keep track of your cars and manage customer rentals, you've decided to built a web app with a database designed based on the following models:

- **_User Model_**
- **_Car Model_**
- **_Booking Model_**

With these models as the foundation, you can build a powerful web app for your car rental business. This app will allow both admins and users to interact smoothly with the booking system:

Both users and administrators need to register and log in to the car rental web app before performing any actions. This ensures a secure and controlled environment for managing rentals.

**_Admin Actions:_**

**_Car Management:_** Admins can create new car entries in the system, specifying details like name, color, features, etc. They can also update existing car information to keep things accurate. Additionally, admins can perform "soft deletes" on cars that are no longer available for rent. This keeps a record of the car but removes it from active listings.

**_Booking Oversight:_** Admins have a comprehensive view of all ongoing and past bookings within the system. This allows them to monitor rental activity and identify any potential issues.

**_Ride Cost Calculation:_** For completed rentals (where the end time has been entered by admin), admins can calculate the total cost using startTime , endTime and pricePerHour to ensure accurate billing.

**_User’s Actions:_**

**_Book a Ride:_** Users can select their pick-up entering carId and startTime to book the perfect car for their needs.

**_Rental History:_** They can easily access their booking history, allowing them to review past rentals.

## Features

- **TypeScript**: Utilizes TypeScript for type safety and improved developer experience.
- **Express**: Implements a RESTful API server using the Express framework for Node.js.
- **Mongoose**: Integrates MongoDB interactions through Mongoose, providing a robust ODM (Object Data Modeling) solution.
- **Development Tools**:
  - **ts-node-dev**: Facilitates automatic restarting of the server on file changes during development.
  - **eslint**: Configured with TypeScript support for code linting.
  - **prettier**: Used for code formatting to maintain consistent style across the project.
- **Scripts**:
  - `start:dev`: Runs the server in development mode with automatic restarts upon file changes.
  - `start:prod`: Executes the compiled server file in production mode.
  - `build`: Compiles TypeScript code into JavaScript output for deployment.
  - `lint`: Lints TypeScript files using ESLint with configured rules.
  - `lint:fix`: Automatically fixes ESLint linting issues where possible.
  - `prettier`: Formats TypeScript, JavaScript, and JSON files based on defined Prettier rules.
  - `prettier:fix`: Automatically formats project files using Prettier.
  - `test`: Placeholder script for running tests (currently echoes an error as no tests are specified).

## Installation

1. **Clone Repository**:

   ```bash
   git clone https://github.com/iqbal-dev/car-rental-reservation-system.git
   cd car-rental-reservation-system

   ```

1. **Install Dependencies:**
   ```bash
   npm install
   or
   yarn install
   ```

## Configuration

### Environment Variables

To configure the environment variables required for this project, follow these steps:

1. **Create a `.env` File:**

   Start by creating a new file named `.env` in the root directory of your project.

2. **Copy from `.env.example`:**

   Copy the contents from the `.env.example` file into your newly created `.env` file.

3. **Configure Variables:**

   Modify the values of the variables in the `.env` file according to your environment and project requirements. Ensure that you provide values for all the required variables specified in the `.env.example` file.

   Here's an example of what the `.env` file might look like:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   SECRET_KEY=mysecretkey
   ```
