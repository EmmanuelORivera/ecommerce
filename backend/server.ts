import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import products, { IProduct } from './data/products';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('API is running....');
});

app.get('/api/products', (req: Request, res: Response) => {
  res.json(products);
});

app.get('/api/products/:id', (req: Request<{ id: string }>, res: Response) => {
  const product: IProduct | undefined = products.find(
    (product) => product._id === req.params.id
  );
  product ? res.json(product) : res.json({ msg: 'No existe ese producto' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`)
);
