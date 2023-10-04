import React from 'react';
import { Redirect } from 'react-router-dom';
import { APP_KEYS } from '../../../common/consts';

interface PublicProps {
  isAuth: boolean;
  children: JSX.Element;
}

export const PublicRoute = ({ isAuth, children }: PublicProps) => {
  if (isAuth) {
    return <Redirect to={APP_KEYS.ROUTER_KEYS.TODO} push />;
  }

  return children;
};
