import React, { FC, ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux';
import { RouteComponentProps } from 'react-router-dom';
import Button from '../Components/Button/Button';
import Rating from '../Components/Rating/Rating';
import './Product.css';
import { fetchProductDetails } from '../redux';
import HTTP_STATUS from '../redux/enum';
import Loading from '../Components/Loading/Loading';
import AlertMessage from '../Components/AlertMessage/AlertMessage';
interface ProductProps extends RouteComponentProps<{ id: string }> {}

const Product: FC<ProductProps> = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const { product, status, errorMessage } = useAppSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    const thunkArg = { id: match.params.id };
    dispatch(fetchProductDetails(thunkArg));
  }, [dispatch, match.params.id]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

  if (!product) return null;
  return (
    <>
      <Button text='Go Back' />

      {status === HTTP_STATUS.PENDING && <Loading />}
      {status === HTTP_STATUS.REJECTED && (
        <AlertMessage variant='error' message={errorMessage} />
      )}
      {status === HTTP_STATUS.IDLE && (
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
                <span>Price:</span> <span>${product.price}</span>
              </div>
              <div className='product__add-cart-info'>
                <span>Status:</span>
                <span>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              {product.countInStock > 0 && (
                <form className='product__add-cart-info'>
                  <label>Quantity:</label>
                  <select value={quantity} onChange={handleChange}>
                    {[...Array(product.countInStock).keys()].map((quantity) => (
                      <option key={quantity + 1} value={quantity + 1}>
                        {quantity + 1}
                      </option>
                    ))}
                  </select>
                </form>
              )}
              <div className='product__add-cart-button'>
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
