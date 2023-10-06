import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useGetUser } from '../../../../../hooks';
import { InputComponent } from '../../../../common/components/input';
import { ButtonComponent } from '../../../../common/components/button';
import { Modal } from '../../../../common/components/modal';
import { useValidationSchema } from './change-password.validation.schema';
import { ChangePassword } from '../../../../common/types';
import { useChangeUserPassword } from '../../../../../hooks/auth/use-change-user-password.hook';

import * as Styled from './change-password-form.styled';

export const ChangePasswordFormComponent = () => {
  const validationSchema = useValidationSchema();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading: isLoadingUser, data: dataUser } = useGetUser();
  const {
    mutate,
    isLoading: isLoadingPassword,
    isError: isErrorPassword,
    data: dataPassword,
    error: errorPassword
  } = useChangeUserPassword();

  const formik = useFormik<ChangePassword>({
    initialValues: {
      email: dataUser?.user.email || '',
      oldPassword: '',
      newPassword: ''
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      mutate(values);
      setIsModalOpen(true);
      helpers.resetForm();
    }
  });

  const {
    values: { email, oldPassword, newPassword },
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
  if (isLoadingUser || isLoadingPassword) {
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
            <Styled.Label htmlFor="email"> Email</Styled.Label>
            <InputComponent
              type="text"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={email}
              disabled
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <Styled.ErrorText $size="m">{errors.email}</Styled.ErrorText>
            )}
          </Styled.FormField>

          <Styled.FormField>
            <Styled.Label htmlFor="password">Old Password*</Styled.Label>
            <InputComponent
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={oldPassword}
              autoComplete="current-password"
            />
            {touched.oldPassword && errors.oldPassword && (
              <Styled.ErrorText $size="m">{errors.oldPassword}</Styled.ErrorText>
            )}
          </Styled.FormField>

          <Styled.FormField>
            <Styled.Label htmlFor="confirmPassword"> New Password*</Styled.Label>
            <InputComponent
              type="password"
              name="newPassword"
              placeholder="Enter new Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={newPassword}
              autoComplete="new-password"
            />
            {touched.newPassword && errors.newPassword && (
              <Styled.ErrorText $size="m">{errors.newPassword}</Styled.ErrorText>
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
          {isErrorPassword ? (
            <>
              <Styled.FormTitle $size="s">
                Error
                <br />
                {errorPassword.response?.data.message}
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
                {dataPassword?.message}
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
