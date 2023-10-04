import React from 'react';
import { useFormik } from 'formik';
import { InputComponent } from '../../../../common/components/input';
import { ButtonComponent } from '../../../../common/components/button';
import { useValidationSchema } from './forgot-password.validation.schema';
import { useForgotPassword } from '../../../../../hooks';
import { UserCredentials } from '../../../../common/types';

import * as Styled from './forgot-password-form.styled';

interface ForgotPasswordFormProps {
  onCancel: () => void;
}

export const ForgotPasswordFormComponent = ({ onCancel }: ForgotPasswordFormProps) => {
  const validationSchema = useValidationSchema();

  const { mutate, isLoading, isError, isSuccess, data, error } = useForgotPassword();

  const formik = useFormik<Pick<UserCredentials, 'email'>>({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      mutate(values);
    }
  });

  const {
    values: { email },
    errors,
    touched,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit
  } = formik;

  if (isLoading) {
    return (
      <Styled.FormWrapper>
        <Styled.Loader />
      </Styled.FormWrapper>
    );
  }

  return (
    <Styled.FormWrapper>
      {isError && error ? (
        <>
          <Styled.FormTitle $size="s">
            Error
            <br />
            {error.response?.data.message}
          </Styled.FormTitle>
          <Styled.ButtonWrapper>
            <ButtonComponent onClick={onCancel}>Ok</ButtonComponent>
          </Styled.ButtonWrapper>
        </>
      ) : isSuccess && data ? (
        <>
          <Styled.FormTitle $size="s">
            Success
            <br />
            {data?.message}
          </Styled.FormTitle>
          <Styled.ButtonWrapper>
            <ButtonComponent onClick={onCancel}>Ok</ButtonComponent>
          </Styled.ButtonWrapper>
        </>
      ) : (
        <>
          <Styled.FormTitle $size="m">Forgot Password</Styled.FormTitle>
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
            <Styled.ButtonWrapper>
              <ButtonComponent type="submit" disabled={!isValid || !dirty}>
                Submit
              </ButtonComponent>
              <ButtonComponent onClick={onCancel}>Cancel</ButtonComponent>
            </Styled.ButtonWrapper>
          </Styled.Form>
        </>
      )}
    </Styled.FormWrapper>
  );
};
