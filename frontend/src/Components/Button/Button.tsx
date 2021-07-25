import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';
type Variant = 'link' | 'button';
interface Props {
  variant: Variant;
  style?: React.CSSProperties;
}

const Button: FC<Props> = ({ variant = 'link', children, style }) => {
  if (variant === 'link') {
    return (
      <Link to='/' className='button'>
        {children}
      </Link>
    );
  } else {
    return (
      <button className='button' style={style}>
        {children}
      </button>
    );
  }
};

export default Button;
