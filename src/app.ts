import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());

// Route for the root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello server',
  });
});

// Route for API endpoints
app.use('/api/v1', router);
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
