import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { UserCredentials, User } from '../../modules/common/types';
import authService from '../../services/auth.service';
import { APP_KEYS } from '../../modules/common/consts';

export const useLoginUser = (): UseMutationResult<
  { message: string; token: string; user: User },
  AxiosError<{ message: string }>,
  UserCredentials
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: UserCredentials) => {
      const result = await authService.login(user);
      return result;
    },
    onSuccess: (data: { message: string; token: string; user: User }) => {
      localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(APP_KEYS.STORAGE_KEYS.USER_ID, data.user.id);
      queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.USER);
    }
  });
};
