import React from 'react';
import { Button as BootstrapButton } from 'reactstrap';

import './style.scss';

const Button = ({ children, onClick, ...props }) => {
  return (
    <BootstrapButton {...props} onClick={onClick}>
      {children}
    </BootstrapButton>
  );
};

export default Button;
