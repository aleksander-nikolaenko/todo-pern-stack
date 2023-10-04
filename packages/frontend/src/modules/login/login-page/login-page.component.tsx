import React from 'react';
import { LoginFormComponent } from '../components/login-forms/login-form-component';

import * as Styled from './login-page.styled';

export const LoginPageComponent = () => (
  <Styled.PageContainer>
    <LoginFormComponent />
  </Styled.PageContainer>
);
