import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useRegisterUser } from '../../../../../hooks';
import { InputComponent } from '../../../../common/components/input';
import { ButtonComponent } from '../../../../common/components/button';
import { Modal } from '../../../../common/components/modal';
import { useValidationSchema } from './register.validation.schema';
import { RegisterCredentials } from '../../../../common/types';

import * as Styled from './register-form.styled';

export const RegisterFormComponent = () => {
  const validationSchema = useValidationSchema();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate, isLoading, isError, data, error } = useRegisterUser();

  const formik = useFormik<RegisterCredentials>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      mutate(values);
      setIsModalOpen(true);
    }
  });

  const {
    values: { email, password, confirmPassword },
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

          <Styled.FormField>
            <Styled.Label htmlFor="confirmPassword"> Confirm Password*</Styled.Label>
            <InputComponent
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={confirmPassword}
              autoComplete="new-password"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Styled.ErrorText $size="m">{errors.confirmPassword}</Styled.ErrorText>
            )}
          </Styled.FormField>

          <Styled.ButtonWrapper>
            <ButtonComponent onClick={handleClickBack}>Back</ButtonComponent>
            <ButtonComponent type="submit" disabled={!isValid || !dirty}>
              Submit
            </ButtonComponent>
          </Styled.ButtonWrapper>
        </Styled.Form>
      </Styled.FormWrapper>
      <Modal isOpen={isModalOpen} onClose={closeModal} isClose>
        <Styled.FormWrapper>
          {isError ? (
            <>
              <Styled.FormTitle $size="s">
                Error
                <br />
                {error.response?.data.message}
              </Styled.FormTitle>
              <Styled.ButtonWrapper>
                <ButtonComponent onClick={closeModal}>Ok</ButtonComponent>
              </Styled.ButtonWrapper>
            </>
          ) : (
            <>
              <Styled.FormTitle $size="s">
                Success
                <br />
                {data?.message}
              </Styled.FormTitle>
              <Styled.ButtonWrapper>
                <ButtonComponent onClick={closeModal}>Ok</ButtonComponent>
              </Styled.ButtonWrapper>
            </>
          )}
        </Styled.FormWrapper>
      </Modal>
    </>
  );
};
