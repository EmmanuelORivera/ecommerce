import React, { FC } from 'react';
import './FormContainer.css';
interface Props {}

const FormContainer: FC<Props> = ({ children }) => {
  return (
    <div className='form__container'>
      <div className='form__content'>{children}</div>
    </div>
  );
};

export default FormContainer;
