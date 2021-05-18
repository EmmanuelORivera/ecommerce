import React, { useEffect } from 'react';
import Product from '../Components/Product/Product';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import './Home.css';
import { fetchProducts } from '../redux/slices/productListSlice';
import { IProduct } from '../products';
const Home = () => {
  const { products } = useAppSelector((state) => state.productList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>
      <div className='latest-products'>
        {products.map((product: IProduct) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default Home;
