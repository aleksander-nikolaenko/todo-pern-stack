import { useMutation, useQueryClient } from 'react-query';
import authService from '../../services/auth.service';
import { APP_KEYS } from '../../modules/common/consts';

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const result = await authService.logout();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.USER);
    }
  });
};
