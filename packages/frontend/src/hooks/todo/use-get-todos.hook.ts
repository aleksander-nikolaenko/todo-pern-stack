import { useQuery } from 'react-query';
import todoService from '../../services/todo.service';
import { QUERY_KEYS } from '../../modules/common/consts/app-keys.const';
import { GetTodosQueryParams } from '../../modules/common/types';

export function useGetTodos(queryParams: GetTodosQueryParams) {
  const { status, search, page, limit } = queryParams;
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS, status, search, page, limit],
    queryFn: async () => {
      const result = await todoService.getTodos({ status, search, page, limit });
      return result;
    }
  });
}
