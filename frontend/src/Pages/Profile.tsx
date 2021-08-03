import React, { useState, useEffect, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AlertMessage from '../Components/AlertMessage';
import Button from '../Components/Button/Button';
import Loader from '../Components/Loader/Loader';

import { detailsUser, updateProfile } from '../redux/thunks/user';
import { useAppSelector, useAppDispatch } from '../redux';
import { userDetailsSelector } from '../redux/slices/userDetailsSlice';
import { userLoginSelector } from '../redux/slices/userSlice';

import StatusCode from '../redux/enum';
import './Login.css';

interface Props extends RouteComponentProps {}

const Profile: FC<Props> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();

  const userDetails = useAppSelector(userDetailsSelector);
  const { errorMessage, status, user, orders } = userDetails;

  const userLogin = useAppSelector(userLoginSelector);

  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user) {
        dispatch(detailsUser('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, user, userInfo]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <>
      <div className="ProfileScreen">
        <div className="ProfileScreen__user">
          <h2>User Profile</h2>
          {message && <AlertMessage variant="error" message={message} />}
          {status === StatusCode.PENDING && <Loader />}
          {status === StatusCode.REJECTED && (
            <AlertMessage variant="error" message={errorMessage} />
          )}
          {success === true && (
            <AlertMessage variant="success" message={'Profile Updated'} />
          )}
          {status === StatusCode.IDLE && (
            <form onSubmit={submitHandler} className="form__bottom">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
              />
              <Button
                variant="button"
                style={{ fontSize: '1em', alignSelf: 'center' }}
              >
                Update
              </Button>
            </form>
          )}
        </div>
        <div className="ProfileScreen__orders">
          <h2>This are orders</h2>
        </div>
      </div>
    </>
  );
};

export default Profile;
