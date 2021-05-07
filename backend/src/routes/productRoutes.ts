import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
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
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      const error = new ProductNotFoundException(req.params.id);
      next(error);
    }
  })
);

export default router;
