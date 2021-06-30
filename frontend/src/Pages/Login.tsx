import React, { useState, useEffect, FC } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux';
import AlertMessage from '../Components/AlertMessage/AlertMessage';
import Loader from '../Components/Loader/Loader';
import FormContainer from '../Components/FormContainer/FormContainer';
import { fetchUser, userLoginSelector } from '../redux/slices/userSlice';
import StatusCode from '../redux/enum';
import './Login.css';
import Button from '../Components/Button/Button';

interface Props extends RouteComponentProps {}

const Login: FC<Props> = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    dispatch(fetchUser({ email, password }));
  };

  return (
    <FormContainer>
      <div className='form__top'>
        <h1>Sign In</h1>
        {status === StatusCode.PENDING && <Loader />}
        {status === StatusCode.REJECTED && (
          <AlertMessage variant='error' message={errorMessage} />
        )}
      </div>
      <form onSubmit={submitHandler} className='form__bottom'>
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
        <Button
          variant='button'
          style={{ fontSize: '1em', alignSelf: 'center' }}
        >
          Sign In
        </Button>
      </form>

      <div className='register'>
        New Customer?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} />
      </div>
    </FormContainer>
  );
};

export default Login;