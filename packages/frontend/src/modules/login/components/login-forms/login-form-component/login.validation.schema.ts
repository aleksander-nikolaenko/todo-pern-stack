import * as yup from 'yup';
import { REGEXPS } from '../../../../common/consts';

export const useValidationSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .required('Required field')
      .min(3, 'Enter more than 2 characters')
      .matches(REGEXPS.email, 'Email format is not valid'),
    password: yup
      .string()
      .required('Required field')
      .matches(REGEXPS.password, 'Not a strong password')
  });
