import React from 'react';
import './Loading.css';
const Loading = () => {
  return (
    <div className='spin-wrapper'>
      <span className='spin__title'>Loading...</span>
      <div className='spin'></div>
    </div>
  );
};

export default Loading;
