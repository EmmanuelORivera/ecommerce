import React, { FC } from 'react';
import { IProduct } from '../../products';
import './Product.css';
interface ProductProps {
  product: IProduct;
}
const Product: FC<ProductProps> = ({ product }) => {
  return (
    <div className='card'>
    <div className='card__wrapper'>
      <div className='card__image'>
        <a href={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </a>
      </div>
      <div className='card__info '>
        <strong>{product.name}</strong>
        <p>
          {product.rating} from {product.numReviews} reviews
        </p>
        <strong className='card__price'>$ {product.price}</strong>
      </div>
      </div>
    </div>
  );
};

export default Product;
