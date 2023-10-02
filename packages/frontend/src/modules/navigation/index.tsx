import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePageContainer from '../home';
import LoginPageContainer from '../login';
import RegisterPageContainer from '../register';
import PasswordPageContainer from '../change-password';
import TodosPageContainer from '../todo';
import { APP_KEYS } from '../common/consts';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route component={HomePageContainer} exact path={APP_KEYS.ROUTER_KEYS.ROOT} />
      <Route component={LoginPageContainer} path={APP_KEYS.ROUTER_KEYS.LOGIN} />
      <Route component={RegisterPageContainer} path={APP_KEYS.ROUTER_KEYS.REGISTER} />
      <Route component={PasswordPageContainer} path={APP_KEYS.ROUTER_KEYS.PROFILE} />
      <Route component={TodosPageContainer} path={APP_KEYS.ROUTER_KEYS.TODO} />
      <Redirect to={APP_KEYS.ROUTER_KEYS.ROOT} />
    </Switch>
  </Router>
);
