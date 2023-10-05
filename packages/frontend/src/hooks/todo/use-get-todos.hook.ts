import { useQuery } from 'react-query';
import todoService from '../../services/todo.service';
import { QUERY_KEYS } from '../../modules/common/consts/app-keys.const';
import { GetTodosQueryParams } from '../../modules/common/types';

export function useGetTodos(queryParams: GetTodosQueryParams) {
  const { status, search } = queryParams;
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS, status, search],
    queryFn: async () => {
      const result = await todoService.getTodos({ status, search });
      return result;
    }
  });
}
