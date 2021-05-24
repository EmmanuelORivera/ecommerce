import React, { FC } from 'react';
import './AlertMessage.css';
type Variant = 'info' | 'error';
interface Props {
  variant: Variant;
  message: string | undefined;
}

const AlertMessage: FC<Props> = ({ message, variant = 'info' }) => {
  return (
    <div className={`alert-container ${variant}`}>
      <span className='alert__close-btn'>&times;</span>
      <h2 className='alert__title'>{variant.toUpperCase()}</h2>
      <p className='alert__message'>{message}</p>
    </div>
  );
};

export default AlertMessage;
