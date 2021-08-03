import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  logoutHandler: () => void;
  showDropDownMenu: () => void;
}

const DropDownMenu: FC<Props> = ({ logoutHandler, showDropDownMenu }) => {
  return (
    <div className={`dropdown__content`}>
      <ul>
        <li>
          <Link
            to="/profile"
            onClick={showDropDownMenu}
            className="dropdown__item"
          >
            Profile
          </Link>
        </li>
        <li>
          <span
            onClick={() => {
              logoutHandler();
              showDropDownMenu();
            }}
            className="dropdown__item"
          >
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};
export default DropDownMenu;
