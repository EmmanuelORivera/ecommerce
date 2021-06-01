import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import colors from 'colors/safe';
import connectDB from './config/db';

import productRoutes from './routes/productRoutes';
import { errorHandler, notFound } from './middlewares/errorMiddleware';
import userRoutes from './routes/userRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running....');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    colors.yellow(
      `Server running in ${process.env.NODE_ENV} mode, on Port ${PORT}`
    )
  )
);
