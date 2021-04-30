import React, { FC } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Button from '../Components/Button/Button';
import Rating from '../Components/Rating/Rating';
import products from '../products';
import './Product.css';
interface ProductProps extends RouteComponentProps<{ id: string }> {}

const Product: FC<ProductProps> = ({ match }) => {
  const product = products.find((product) => product._id === match.params.id);
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
          <div className='margin-2'>
            <strong>Price: </strong> ${product.price}
          </div>
          <div className='margin-2'>
            <strong>Description: </strong> {product.description}
          </div>
        </div>
        <div className='product__add-cart wrapper'>
          <div className='test'>
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
