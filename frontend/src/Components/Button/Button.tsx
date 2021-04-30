import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';
interface Props {
  text: string;
}

const Button: FC<Props> = ({ text }) => {
  return (
    <div>
      <Link to='/' className='button'>
        {text}
      </Link>
    </div>
  );
};

export default Button;
