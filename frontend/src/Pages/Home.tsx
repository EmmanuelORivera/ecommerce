import React from 'react';
import Product from '../Components/Product/Product';
import products from '../products';
import './Home.css';
const Home = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <div className='latest-products'>
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default Home;
