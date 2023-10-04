import React from 'react';
import { Redirect } from 'react-router-dom';
import { APP_KEYS } from '../../../common/consts';

interface ProtectedProps {
  isAuth: boolean;
  children: JSX.Element;
}

export const ProtectedRoute = ({ isAuth, children }: ProtectedProps) => {
  if (!isAuth) {
    return <Redirect to={APP_KEYS.ROUTER_KEYS.ROOT} push />;
  }

  return children;
};
