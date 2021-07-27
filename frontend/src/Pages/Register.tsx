import React, { useState, useEffect, FC } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import AlertMessage from '../Components/AlertMessage';
import Button from '../Components/Button/Button';
import Loader from '../Components/Loader/Loader';
import FormContainer from '../Components/FormContainer/FormContainer';

import { registerUser } from '../redux/thunks/user';
import StatusCode from '../redux/enum';
import { useAppSelector, useAppDispatch } from '../redux';
import { userLoginSelector } from '../redux/slices/userSlice';
import './Login.css';

interface Props extends RouteComponentProps {}

const Register: FC<Props> = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();

  const userLogin = useAppSelector(userLoginSelector);
  const { errorMessage, status, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(registerUser({ email, name, password }));
    }
  };

  return (
    <FormContainer>
      <div className='form__top'>
        <h1>Sign Up</h1>
        {status === StatusCode.PENDING && <Loader />}
        {status === StatusCode.REJECTED && (
          <AlertMessage variant='error' message={errorMessage} />
        )}
        {message && <AlertMessage variant='error' message={message} />}
      </div>
      <form onSubmit={submitHandler} className='form__bottom'>
        <label>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='input'
        />
        <label>Email Address</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='input'
        />
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input'
        />
        <label>Confirm Password</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='input'
        />
        <Button
          variant='button'
          style={{ fontSize: '1em', alignSelf: 'center' }}
        >
          Register
        </Button>
      </form>

      <div className='register'>
        Have an Account?
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
          Login
        </Link>
      </div>
    </FormContainer>
  );
};

export default Register;
