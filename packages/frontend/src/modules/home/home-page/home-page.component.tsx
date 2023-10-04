import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../../common/consts';
import { TitleComponent } from '../../common/components/title/title.component';
import { ButtonComponent } from '../../common/components/button';
import { Modal } from '../../common/components/modal';
import { ForgotPasswordFormComponent } from '../components/home-forms/forgot-password-form-component';

import * as Styled from './home-page.styled';

export const HomePageComponent = () => {
  const history = useHistory();

  const [isModalOpenForgot, setIsModalOpenForgot] = useState(false);

  const closeModal = () => {
    setIsModalOpenForgot(false);
  };

  const handleClickLogin = () => {
    history.push(APP_KEYS.ROUTER_KEYS.LOGIN);
  };
  const handleClickRegister = () => {
    history.push(APP_KEYS.ROUTER_KEYS.REGISTER);
  };
  const handleClickForgot = () => {
    setIsModalOpenForgot(true);
  };
  return (
    <>
      <Styled.PageContainer>
        <TitleComponent size="xl" title="App Name" />
        <Styled.ButtonContainer>
          <ButtonComponent onClick={handleClickLogin}>Login</ButtonComponent>
          <ButtonComponent onClick={handleClickRegister}>Register</ButtonComponent>
          <Styled.Link onClick={handleClickForgot}>Forgot Password?</Styled.Link>
        </Styled.ButtonContainer>
      </Styled.PageContainer>

      <Modal isOpen={isModalOpenForgot} onClose={closeModal} isClose>
        <ForgotPasswordFormComponent onCancel={closeModal} />
      </Modal>
    </>
  );
};
