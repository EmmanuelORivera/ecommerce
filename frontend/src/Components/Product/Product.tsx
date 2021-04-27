import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../products';
import Rating from '../Rating/Rating';
import './Product.css';
interface ProductProps {
  product: IProduct;
}
const Product: FC<ProductProps> = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className='card'>
        <div className='card__wrapper'>
          <div className='card__image'>
            <img src={product.image} alt={product.name} />
          </div>
          <div className='card__info '>
            <strong>{product.name}</strong>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <strong className='card__price'>$ {product.price}</strong>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
