import { useQuery } from 'react-query';
import authService from '../../services/auth.service';
import { APP_KEYS } from '../../modules/common/consts';

export const useGetUser = () =>
  useQuery({
    queryKey: APP_KEYS.QUERY_KEYS.USER,
    queryFn: async () => {
      const result = await authService.getCurrentUser();
      return result;
    },
    onSuccess: (data) => {
      localStorage.setItem(APP_KEYS.STORAGE_KEYS.USER_ID, data.user.id);
    },
    onError: () => {
      localStorage.setItem(APP_KEYS.STORAGE_KEYS.USER_ID, '');
    }
  });
