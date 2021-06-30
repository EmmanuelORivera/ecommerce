import React, { useEffect } from 'react';
import Product from '../Components/Product/Product';
import { useAppDispatch, useAppSelector } from '../redux';
import './Home.css';
import { fetchProducts } from '../redux/';
import { IProduct } from '../products';
import StatusCode from '../redux/enum';
import Loader from '../Components/Loader/Loader';
import AlertMessage from '../Components/AlertMessage/AlertMessage';

const Home = () => {
  const { products, status, errorMessage } = useAppSelector(
    (state) => state.productList
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>
      {status === StatusCode.PENDING && <Loader />}
      {status === StatusCode.REJECTED && (
        <AlertMessage message={errorMessage} variant={'error'} />
      )}
      {status === StatusCode.IDLE && (
        <div className='latest-products'>
          {products.map((product: IProduct) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
