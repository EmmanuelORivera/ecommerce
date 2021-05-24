import React, { useEffect } from 'react';
import Product from '../Components/Product/Product';
import { useAppDispatch, useAppSelector } from '../redux';
import './Home.css';
import { fetchProducts } from '../redux/';
import { IProduct } from '../products';
import HTTP_STATUS from '../redux/enum';
import Loading from '../Components/Loading/Loading';
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
      {status === HTTP_STATUS.PENDING && <Loading />}
      {status === HTTP_STATUS.REJECTED && (
        <AlertMessage message={errorMessage} variant={'error'} />
      )}
      {status === HTTP_STATUS.IDLE && (
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
