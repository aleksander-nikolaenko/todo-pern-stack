import * as yup from 'yup';

export const useValidationSchema = () =>
  yup.object().shape({
    title: yup
      .string()
      .required('Required field')
      .trim()
      .min(3, 'Enter more 2 symbols')
      .max(50, 'Enter less 50 symbols'),
    description: yup
      .string()
      .optional()
      .trim()
      .min(3, 'Enter more 2 symbols')
      .max(500, 'Enter less 500 symbols')
  });
