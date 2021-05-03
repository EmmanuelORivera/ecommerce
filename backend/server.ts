import express, { Request, Response } from 'express';
const app = express();
const PORT = 5000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get desde el servidor' });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
