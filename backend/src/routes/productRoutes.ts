import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import ProductModel from '../models/product/model';

const router = Router();

// desc     Fetch all products
// @route   GET/api/products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const products = await ProductModel.find({});
    res.json(products);
  })
);

// desc     Fetch single product
// @route   GET/api/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  })
);

export default router;
