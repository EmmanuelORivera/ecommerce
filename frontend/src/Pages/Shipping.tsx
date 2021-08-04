import React, { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Button from '../Components/Button/Button';
import FormContainer from '../Components/FormContainer/FormContainer';

import { cartSelector } from '../redux/slices/cartSlice';
import { saveShippingAddress } from '../redux/thunks/cart';
import { useAppSelector, useAppDispatch } from '../redux';

import StatusCode from '../redux/enum';

interface Props extends RouteComponentProps {}

const Shipping: FC<Props> = ({ history }) => {
  const cart = useAppSelector(cartSelector);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>

      <form onSubmit={submitHandler} className="form__bottom">
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="input"
        />
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="input"
        />
        <label>Postal Code</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
          className="input"
        />
        <label>Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="input"
        />

        <Button
          variant="button"
          style={{ fontSize: '1em', alignSelf: 'center' }}
        >
          Continue
        </Button>
      </form>
    </FormContainer>
  );
};

export default Shipping;
