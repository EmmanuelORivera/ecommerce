import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../Components/Product/Product';
import { IProduct } from '../products';
import './Home.css';
const Home = () => {
  const [products, setProducts] = useState<Array<IProduct>>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);
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
