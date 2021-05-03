import express, { Request, Response } from 'express';
import products, { IProduct } from './data/products';
const app = express();
const PORT = 5000;

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

app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
