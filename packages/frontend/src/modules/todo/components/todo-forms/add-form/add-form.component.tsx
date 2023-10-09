import React from 'react';
import { useFormik } from 'formik';
import { useCreateTodo } from '../../../../../hooks';
import { InputComponent } from '../../../../common/components/input';
import { ButtonComponent } from '../../../../common/components/button';
import { ButtonToggleComponent } from '../../../../common/components/button-toggle';
import { useValidationSchema } from './add-form.validation-schema';
import { CreateTodo } from '../../../../common/types';

import * as Styled from './add-form.styled';

interface AddTodoFormProps {
  onCancel: () => void;
}

export const AddTodoForm = ({ onCancel }: AddTodoFormProps) => {
  const validationSchema = useValidationSchema();

  const { mutate, isSuccess, isError } = useCreateTodo();
  const formik = useFormik<CreateTodo>({
    initialValues: {
      title: '',
      description: '',
      isCompleted: false,
      isPrivate: false
    },
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      mutate(values);
      formikHelpers.resetForm();
    }
  });

  const {
    values: { title, description, isCompleted, isPrivate },
    errors,
    touched,
    isValid,
    dirty,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
  } = formik;

  const handleChangeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked: value } = event.target;
    setFieldValue(name, value);
  };

  return (
    <Styled.FormWrapper>
      {isError ? (
        <>
          <Styled.FormTitle $size="s">Error Add Todo. Try again.</Styled.FormTitle>
          <Styled.ButtonWrapper>
            <ButtonComponent onClick={onCancel}>Ok</ButtonComponent>
          </Styled.ButtonWrapper>
        </>
      ) : isSuccess ? (
        <>
          <Styled.FormTitle $size="s">Todo added successfully</Styled.FormTitle>
          <Styled.ButtonWrapper>
            <ButtonComponent onClick={onCancel}>Ok</ButtonComponent>
          </Styled.ButtonWrapper>
        </>
      ) : (
        <>
          <Styled.FormTitle $size="m">Add Todo</Styled.FormTitle>
          <Styled.Form onSubmit={handleSubmit}>
            <Styled.FormField>
              <Styled.Label htmlFor="title"> Todo Title*</Styled.Label>
              <InputComponent
                type="text"
                name="title"
                placeholder="Enter title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={title}
                autoComplete="title"
              />
              {touched.title && errors.title && (
                <Styled.ErrorText $size="m">{errors.title}</Styled.ErrorText>
              )}
            </Styled.FormField>
            <Styled.FormField>
              <Styled.Label htmlFor="description"> Todo Description</Styled.Label>
              <Styled.TextArea
                id="description"
                name="description"
                placeholder="Enter description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={description}
              />
              {touched.description && errors.description && (
                <Styled.ErrorText $size="m">{errors.description}</Styled.ErrorText>
              )}
            </Styled.FormField>
            <Styled.FormField>
              <Styled.ToggleWrapper>
                <Styled.ToggleLabel>Completed</Styled.ToggleLabel>
                <ButtonToggleComponent
                  name="isCompleted"
                  checked={isCompleted}
                  onChange={handleChangeToggle}
                />
              </Styled.ToggleWrapper>
            </Styled.FormField>
            <Styled.FormField>
              <Styled.ToggleWrapper>
                <Styled.ToggleLabel>Private</Styled.ToggleLabel>
                <ButtonToggleComponent
                  name="isPrivate"
                  checked={isPrivate}
                  onChange={handleChangeToggle}
                />
              </Styled.ToggleWrapper>
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
