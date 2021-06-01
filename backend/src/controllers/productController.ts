import asyncHandler from 'express-async-handler';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import ProductModel from '../models/product/model';

// desc     Fetch all products
// @route   GET/api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
});

// desc     Fetch single product
// @route   GET/api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    const error = new ProductNotFoundException(req.params.id);
    next(error);
  }
});

export { getProducts, getProductById };
