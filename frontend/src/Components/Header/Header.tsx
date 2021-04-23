import React from 'react';
import { ReactComponent as Logo } from '../../images/Logo.svg';
import './Header.css';
const Header = () => {
  return (
    <header className='header'>
      <div className='wrapper grid-2-columns'>
        <Logo />
        <nav className='header__nav'>
          <a href='#'><i className='fas fa-shopping-cart'></i>Cart</a>
          <a href='#'><i className='fas fa-user'></i>Sign in</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
