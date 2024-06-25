# Car Rental Business Web App

## Overview

This app is designed to manage a car rental business, allowing both admins and users to interact smoothly with the booking system. The app provides features for car management, booking rides, and viewing rental history.

## Features

### Admin Actions

- **Car Management**: Create, update, and soft delete car entries.
- **Booking Oversight**: View all ongoing and past bookings.
- **Ride Cost Calculation**: Calculate the total cost for completed rentals.

### User Actions

- **Book a Ride**: Select a car and book it by entering the pick-up time.
- **Rental History**: View past bookings.

## Models

### User Model

- `id` (integer, primary key)
- `username` (string, unique, required)
- `email` (string, unique, required)
- `password` (string, required)
- `role` (string, either 'admin' or 'user', required)

### Car Model

- `id` (integer, primary key)
- `name` (string, required)
- `color` (string, required)
- `features` (string, optional)
- `pricePerHour` (decimal, required)
- `createdAt` (datetime, auto-generated)
- `updatedAt` (datetime, auto-generated)
- `isDeleted` (boolean, default false)

### Booking Model

- `id` (integer, primary key)
- `carId` (foreign key to Car Model, required)
- `userId` (foreign key to User Model, required)
- `startTime` (datetime, required)
- `endTime` (datetime, optional)
- `totalCost` (decimal, optional, calculated)

## Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/iqbal-dev/car-rental-reservation-system.git
    cd car-rental-reservation-system
    ```

2. **Configure Environment Variables**

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

3. **Install Dependencies**

    For a Node.js app, you might run:

    ```bash
    npm install
    # or
    yarn add
    ```

4. **Setup Database**

    Create a database and update the configuration in your project settings.

5. **Start the Server**

    For Node.js:

    ```bash
    npm start
    # or
    yarn start
    ```

## API Endpoints

### Authentication

- `POST /register`: Register a new user or admin.
- `POST /login`: Log in a user or admin.

### Admin Routes

- `POST /cars`: Create a new car.
- `PUT /cars/:id`: Update an existing car.
- `DELETE /cars/:id`: Soft delete a car.
- `GET /bookings`: View all bookings.
- `POST /bookings/return`: Calculate the cost of a completed booking.

### User Routes

- `POST /bookings`: Book a car.
- `GET /bookings/my-bookings`: View a user's booking history.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspiration and guidelines based on standard practices for web app development.
