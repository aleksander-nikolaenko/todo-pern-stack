import { UseMutationResult, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { RegisterCredentials, User } from '../../modules/common/types';
import authService from '../../services/auth.service';

export const useRegisterUser = (): UseMutationResult<
  { message: string; user: User },
  AxiosError<{ message: string }>,
  RegisterCredentials
> =>
  useMutation({
    mutationFn: async (user: RegisterCredentials) => {
      const result = await authService.register(user);
      return result;
    }
  });
