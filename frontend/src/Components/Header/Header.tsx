import React from 'react';
import DropDownMenu from './DropDownMenu';
import OutsiderAlert from './OutsiderAlert';
import { useAppDispatch, useAppSelector } from '../../redux';
import { logout } from '../../redux/slices/userSlice';
import { userLoginSelector } from '../../redux/slices/userSlice';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../images/Logo.svg';
import './Header.css';
import {
  ShowComponentSetValue,
  ShowComponentValue,
  useStateShowComponent,
} from '../../hooks/useShowComponent';

const Header = () => {
  const [show, setShow] = useStateShowComponent(false);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(userLoginSelector);

  const logoutHandler = () => {
    //Logout first clean the localhost.
    dispatch(logout());
  };

  const showDropDownMenu = (setShow: ShowComponentSetValue) => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <header className="header">
      <div className="wrapper grid-2-columns">
        <Logo />
        <nav className="header__nav">
          <NavLink
            to="/cart"
            activeStyle={{ fontWeight: 'bold' }}
            className="nav__item"
          >
            <i className="fas fa-shopping-cart"></i>Cart
          </NavLink>
          {userInfo ? (
            <div>
              <OutsiderAlert
                style={{ cursor: 'pointer' }}
                show={show}
                setIsComponentActive={setShow}
                render={(show: ShowComponentValue) => {
                  return (
                    show && (
                      <DropDownMenu
                        logoutHandler={() => logoutHandler()}
                        showDropDownMenu={() => showDropDownMenu(setShow)}
                      />
                    )
                  );
                }}
              >
                <span
                  onClick={() => {
                    setShow((prevShow) => !prevShow);
                  }}
                >
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                  {userInfo.name}
                </span>
              </OutsiderAlert>
            </div>
          ) : (
            <NavLink to="/login" activeStyle={{ fontWeight: 'bold' }}>
              <i className="fas fa-user"></i>Sign in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
