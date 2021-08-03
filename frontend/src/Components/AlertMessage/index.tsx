import React, { FC } from 'react';

import './AlertMessage.scss';

type Variant = 'error' | 'info' | 'success';
interface Props {
  variant: Variant;
  message: string | undefined;
}

const AlertMessage: FC<Props> = ({ message, variant = 'info', children }) => {
  return (
    <div className={`AlertMessage ${`AlertMessage--${variant}`}`}>
      <h2 className="AlertMessage__title">{variant.toUpperCase()}</h2>
      <p className="AlertMessage__text">
        {message} {children}
      </p>
    </div>
  );
};

export default AlertMessage;
