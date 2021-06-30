import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  logoutHandler: () => void;
}

const DropDownMenu: FC<Props> = ({ logoutHandler }) => {
  return (
    <div className={`dropdown__content`}>
      <ul>
        <li>
          <Link to='/profile' className='dropdown__item'>
            Profile
          </Link>
        </li>
        <li>
          <span onClick={logoutHandler} className='dropdown__item'>
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};
export default DropDownMenu;
