import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useLoginUser, useSendVerifyEmail } from '../../../../../hooks';
import { InputComponent } from '../../../../common/components/input';
import { ButtonComponent } from '../../../../common/components/button';
import { Modal } from '../../../../common/components/modal';
import { useValidationSchema } from './login.validation.schema';
import { UserCredentials } from '../../../../common/types';

import * as Styled from './login-form.styled';

export const LoginFormComponent = () => {
  const validationSchema = useValidationSchema();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVerify, setIsModalOpenVerify] = useState(false);

  const { mutate, isLoading, isError, error } = useLoginUser();
  const {
    mutate: mutateVerify,
    isError: isErrorVerify,
    data: dataVerify,
    error: errorVerify
  } = useSendVerifyEmail();

  const formik = useFormik<UserCredentials>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      mutate(values);
      setIsModalOpen(true);
    }
  });

  const {
    values: { email, password },
    errors,
    touched,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit
  } = formik;

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpenVerify(false);
  };

  const handleClickResendVerifyEmail = () => {
    mutateVerify({ email });
    setIsModalOpenVerify(true);
  };

  const handleClickBack = () => {
    history.goBack();
  };
  if (isLoading) {
    return (
      <Styled.FormWrapper>
        <Styled.Loader />
      </Styled.FormWrapper>
    );
  }
  return (
    <>
      <Styled.FormWrapper>
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.FormField>
            <Styled.Label htmlFor="email"> Email*</Styled.Label>
            <InputComponent
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={email}
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <Styled.ErrorText $size="m">{errors.email}</Styled.ErrorText>
            )}
          </Styled.FormField>

          <Styled.FormField>
            <Styled.Label htmlFor="password"> Password*</Styled.Label>
            <InputComponent
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={password}
              autoComplete="new-password"
            />
            {touched.password && errors.password && (
              <Styled.ErrorText $size="m">{errors.password}</Styled.ErrorText>
            )}
          </Styled.FormField>

          <Styled.ButtonWrapper>
            <ButtonComponent onClick={handleClickBack}>Back</ButtonComponent>
            <ButtonComponent type="submit" disabled={!isValid || !dirty}>
              Submit
            </ButtonComponent>
          </Styled.ButtonWrapper>
          {error?.response?.data.message === 'Email not verify' && email && (
            <Styled.Link onClick={handleClickResendVerifyEmail}>Resend verify Email</Styled.Link>
          )}
        </Styled.Form>
      </Styled.FormWrapper>
      <Modal isOpen={isModalOpen} onClose={closeModal} isClose>
        {isError && (
          <Styled.FormWrapper>
            <Styled.FormTitle $size="s">
              Error
              <br />
              {error.response?.data.message}
            </Styled.FormTitle>
            <Styled.ButtonWrapper>
              <ButtonComponent onClick={closeModal}>Ok</ButtonComponent>
            </Styled.ButtonWrapper>
          </Styled.FormWrapper>
        )}
      </Modal>
      <Modal isOpen={isModalOpenVerify} onClose={closeModal} isClose>
        {isErrorVerify ? (
          <Styled.FormWrapper>
            <Styled.FormTitle $size="s">
              Error
              <br />
              {errorVerify.response?.data.message}
            </Styled.FormTitle>
            <Styled.ButtonWrapper>
              <ButtonComponent onClick={closeModal}>Ok</ButtonComponent>
            </Styled.ButtonWrapper>
          </Styled.FormWrapper>
        ) : dataVerify ? (
          <>
            <Styled.FormTitle $size="s">
              Success
              <br />
              {dataVerify?.message}
            </Styled.FormTitle>
            <Styled.ButtonWrapper>
              <ButtonComponent onClick={closeModal}>Ok</ButtonComponent>
            </Styled.ButtonWrapper>
          </>
        ) : (
          <Styled.FormWrapper>
            <Styled.Loader />
          </Styled.FormWrapper>
        )}
      </Modal>
    </>
  );
};
