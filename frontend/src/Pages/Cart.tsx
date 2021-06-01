import React, { FC, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux';
import {
  cartSelector,
  addToCart,
  removeFromCart,
} from '../redux/slices/cartSlice';
import AlertMessage from '../Components/AlertMessage/AlertMessage';
import './Cart.css';
import { ICartProduct } from '../redux/slices/types';
interface Props extends RouteComponentProps<{ id: string }> {}

const Cart: FC<Props> = ({ match, location, history }) => {
  const productId = match.params.id;
  const QUANTITY_VALUE = 1;

  const getQuantityValue = () => {
    return Number(location.search.split('=')[1]);
  };

  const quantity = location.search ? getQuantityValue() : QUANTITY_VALUE;

  const dispatch = useAppDispatch();

  const { cartItems, status, errorMessage } = useAppSelector(cartSelector);

  useEffect(() => {
    if (productId) {
      const thunkArg = { id: productId, quantity };
      dispatch(addToCart(thunkArg));
    }
  }, [dispatch, productId, quantity]);

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  const deleteHandler = (cartItem: ICartProduct) => {
    dispatch(removeFromCart(cartItem.product));
  };
  return (
    <>
      <h1>Shopping Cart</h1>
      <div className='shopping'>
        <div className='shopping__left'>
          {cartItems.length === 0 ? (
            <AlertMessage variant='info' message='Your cart is empty'>
              <Link className='go-back-link' to='/'>
                Go back
              </Link>
            </AlertMessage>
          ) : (
            <div className='shopping__items'>
              {cartItems.map((cartItem) => (
                <div className='shopping__item' key={cartItem.product}>
                  <div className='shopping__item-image'>
                    <img src={cartItem.image} alt={cartItem.name} />
                  </div>
                  <div className='shopping__item-name'>
                    <Link to={`/product/${cartItem.product}`}>
                      {cartItem.name}
                    </Link>
                  </div>
                  <div className='shopping__item-price'>${cartItem.price}</div>
                  <div className='shopping__item-quantity'>
                    <form className=''>
                      <select
                        value={cartItem.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart({
                              id: cartItem.product,
                              quantity: Number(e.target.value),
                            })
                          )
                        }
                      >
                        {[...Array(cartItem.countInStock).keys()].map(
                          (quantity) => (
                            <option key={quantity + 1} value={quantity + 1}>
                              {quantity + 1}
                            </option>
                          )
                        )}
                      </select>
                    </form>
                  </div>
                  <div className='shopping__item-delete'>
                    <button
                      type='button'
                      onClick={(e) => deleteHandler(cartItem)}
                    >
                      <i className='fa fa-trash' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='shopping__right'>
          <div className='shopping__right-wrapper'>
            <div className='shopping__right-info'>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (acc, cartItem) => acc + cartItem.quantity,
                  0
                )}
                ) items
              </h2>
              <span>
                $
                {cartItems
                  .reduce(
                    (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className='product__add-cart-button'>
              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
