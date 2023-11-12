import React from 'react';
import { useLogoutUser } from '../../../hooks';
import { APP_KEYS } from '../../common/consts';
import { ChangePasswordFormComponent } from '../components/profile-forms/change-password-form-component';
import { ButtonComponent } from '../../common/components/button';
import { Loader } from '../../todo/todo-list-page';

import * as Styled from './profile-page.styled';

export const ProfilePageComponent = () => {
  const userId = localStorage.getItem(APP_KEYS.STORAGE_KEYS.USER_ID);
  const { mutate, isLoading } = useLogoutUser();
  const handleClickLogout = () => {
    mutate();
  };

  if (isLoading) {
    return (
      <Styled.PageContainer>
        <Loader />
      </Styled.PageContainer>
    );
  }

  return userId ? (
    <Styled.PageContainer>
      <ChangePasswordFormComponent />
      <Styled.ButtonWrapper>
        <ButtonComponent onClick={handleClickLogout}>Logout</ButtonComponent>
      </Styled.ButtonWrapper>
    </Styled.PageContainer>
  ) : null;
};
