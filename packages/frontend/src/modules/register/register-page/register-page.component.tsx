import React from 'react';
import { RegisterFormComponent } from '../components/register-forms/register-form-component';

import * as Styled from './register-page.styled';

export const RegisterPageComponent = () => (
  <Styled.PageContainer>
    <RegisterFormComponent />
  </Styled.PageContainer>
);
