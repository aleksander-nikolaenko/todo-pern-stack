import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePageContainer from '../home';
import LoginPageContainer from '../login';
import RegisterPageContainer from '../register';
import TodosPageContainer from '../todo';
import { APP_KEYS } from '../common/consts';
import { PublicRoute } from './components/public-route';
import { ProtectedRoute } from './components/protected-route';
import { useGetUser } from '../../hooks';
import { Loader } from '../register/components/register-forms/register-form-component';
import { PageContainer } from '../home/home-page';
import ProfilePageContainer from '../profile';

export const MainRouter = () => {
  const { isLoading, data } = useGetUser();
  const isAuth = data ? data?.user.isAuth : false;

  if (isLoading) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path={APP_KEYS.ROUTER_KEYS.ROOT}>
          <PublicRoute isAuth={isAuth}>
            <HomePageContainer />
          </PublicRoute>
        </Route>

        <Route path={APP_KEYS.ROUTER_KEYS.LOGIN}>
          <PublicRoute isAuth={isAuth}>
            <LoginPageContainer />
          </PublicRoute>
        </Route>

        <Route path={APP_KEYS.ROUTER_KEYS.REGISTER}>
          <PublicRoute isAuth={isAuth}>
            <RegisterPageContainer />
          </PublicRoute>
        </Route>

        <Route path={APP_KEYS.ROUTER_KEYS.PROFILE}>
          <ProtectedRoute isAuth={isAuth}>
            <ProfilePageContainer />
          </ProtectedRoute>
        </Route>

        <Route path={APP_KEYS.ROUTER_KEYS.TODO}>
          <ProtectedRoute isAuth={isAuth}>
            <TodosPageContainer />
          </ProtectedRoute>
        </Route>

        <Redirect to={APP_KEYS.ROUTER_KEYS.ROOT} />
      </Switch>
    </Router>
  );
};
