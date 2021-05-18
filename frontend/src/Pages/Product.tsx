import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RouteComponentProps } from 'react-router-dom';
import Button from '../Components/Button/Button';
import Rating from '../Components/Rating/Rating';
import './Product.css';
import { fetchProduct } from '../redux/slices/productSlice';
interface ProductProps extends RouteComponentProps<{ id: string }> {}

const Product: FC<ProductProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct(match.params.id));
  }, [dispatch, match.params.id]);

  if (!product) return null;
  return (
    <>
      <Button text='Go Back' />

      <div className='product__wrapper'>
        <div className='product__image'>
          <img src={product.image} alt={product.name} />
        </div>
        <div className='product__description wrapper'>
          <h2>{product.name}</h2>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <div>
            <strong>Price: </strong> ${product.price}
          </div>
          <div>
            <strong>Description: </strong> {product.description}
          </div>
        </div>
        <div className='product__add-cart wrapper'>
          <div className='product__border'>
            <div className='product__add-cart-info'>
              <strong>Price:</strong> <span>${product.price}</span>
            </div>
            <div className='product__add-cart-info'>
              <strong>Status:</strong>
              <span>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className='product__add-cart-button'>
              <button>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
