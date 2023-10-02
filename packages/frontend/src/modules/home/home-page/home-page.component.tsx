import React from 'react';
import { useHistory } from 'react-router-dom';
import { TitleComponent } from '../../common/components/title/title.component';
import { ButtonComponent } from '../../common/components/button';
import { APP_KEYS } from '../../common/consts';

import * as Styled from './home-page.styled';

export const HomePageComponent = () => {
  const history = useHistory();
  const handleClickLogin = () => {
    history.push(APP_KEYS.ROUTER_KEYS.LOGIN);
  };
  const handleClickRegister = () => {
    history.push(APP_KEYS.ROUTER_KEYS.REGISTER);
  };
  const handleClickTodos = () => {
    history.push(APP_KEYS.ROUTER_KEYS.TODO);
  };
  return (
    <Styled.PageContainer>
      <TitleComponent size="xl" title="App Name" />
      <Styled.ButtonContainer>
        <ButtonComponent onClick={handleClickTodos}>Todos</ButtonComponent>
        <ButtonComponent onClick={handleClickLogin}>Login</ButtonComponent>
        <ButtonComponent onClick={handleClickRegister}>Register</ButtonComponent>
        <Styled.Link to={APP_KEYS.ROUTER_KEYS.PROFILE}>Forget Password?</Styled.Link>
      </Styled.ButtonContainer>
    </Styled.PageContainer>
  );
};
