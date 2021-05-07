import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import colors from 'colors/safe';
import connectDB from './config/db';

import productRoutes from './routes/productRoutes';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('API is running....');
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    colors.yellow(
      `Server running in ${process.env.NODE_ENV} mode, on Port ${PORT}`
    )
  )
);
