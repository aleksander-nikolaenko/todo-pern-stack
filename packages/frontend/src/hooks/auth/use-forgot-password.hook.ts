import { UseMutationResult, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { UserCredentials } from '../../modules/common/types';
import authService from '../../services/auth.service';

export const useForgotPassword = (): UseMutationResult<
  { message: string },
  AxiosError<{ message: string }>,
  Pick<UserCredentials, 'email'>
> =>
  useMutation({
    mutationFn: async (user: Pick<UserCredentials, 'email'>) => {
      const result = await authService.forgot(user);
      return result;
    }
  });
