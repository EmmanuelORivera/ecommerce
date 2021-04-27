import React, { FC } from 'react';
import Stars from './Stars';
import './Rating.css';
interface RatingProps {
  value: number;
  text: string;
}

const Rating: FC<RatingProps> = ({ value, text }) => {
  return (
    <div className='rating'>
      <Stars rating={value} />
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
