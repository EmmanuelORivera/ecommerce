import React from 'react';
import './Loader.css';
const Loader = () => {
  return (
    <div className='spin-wrapper'>
      <span className='spin__title'>Loading...</span>
      <div className='spin'></div>
    </div>
  );
};

export default Loader;
