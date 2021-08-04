import React, { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Button from '../Components/Button/Button';
import FormContainer from '../Components/FormContainer/FormContainer';

import StatusCode from '../redux/enum';

interface Props extends RouteComponentProps {}

const Shipping: FC<Props> = ({ history }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
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
