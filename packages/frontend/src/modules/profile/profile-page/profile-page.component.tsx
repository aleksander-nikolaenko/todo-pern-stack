import React from 'react';
import { ChangePasswordFormComponent } from '../components/profile-forms/change-password-form-component';
import { ButtonComponent } from '../../common/components/button';

import * as Styled from './profile-page.styled';
import { useLogoutUser } from '../../../hooks';

export const ProfilePageComponent = () => {
  const { mutate } = useLogoutUser();
  const handleClickLogout = () => {
    mutate();
  };
  return (
    <Styled.PageContainer>
      <ChangePasswordFormComponent />
      <Styled.ButtonWrapper>
        <ButtonComponent onClick={handleClickLogout}>Logout</ButtonComponent>
      </Styled.ButtonWrapper>
    </Styled.PageContainer>
  );
};
