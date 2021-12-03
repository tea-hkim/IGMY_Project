/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button } from '../styles/AuthStyle';

const AuthButton = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};

export default AuthButton;
