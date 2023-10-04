import { UseMutationResult, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { ChangePassword } from '../../modules/common/types';
import userService from '../../services/user.service';

export const useChangeUserPassword = (): UseMutationResult<
  { message: string },
  AxiosError<{ message: string }>,
  ChangePassword
> =>
  useMutation({
    mutationFn: async (user: ChangePassword) => {
      const result = await userService.changeUserPassword(user);
      return result;
    }
  });
