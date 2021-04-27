import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/Logo.svg';
import './Header.css';
const Header = () => {
  return (
    <header className='header'>
      <div className='wrapper grid-2-columns'>
        <Logo />
        <nav className='header__nav'>
          <NavLink to='/cart' activeStyle={{ fontWeight: 'bold' }}>
            <i className='fas fa-shopping-cart'></i>Cart
          </NavLink>
          <NavLink to='/login' activeStyle={{ fontWeight: 'bold' }}>
            <i className='fas fa-user'></i>Sign in
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
