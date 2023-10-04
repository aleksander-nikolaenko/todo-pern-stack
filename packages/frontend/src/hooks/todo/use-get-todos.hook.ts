import { useQuery } from 'react-query';
import todoService from '../../services/todo.service';
import { QUERY_KEYS } from '../../modules/common/consts/app-keys.const';

export function useGetTodos() {
  return useQuery({
    queryKey: QUERY_KEYS.TODOS,
    queryFn: async () => {
      const result = await todoService.getTodos();
      return result;
    }
  });
}
