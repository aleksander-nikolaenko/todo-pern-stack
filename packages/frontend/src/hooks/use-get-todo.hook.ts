import { useQuery } from 'react-query';
import todoService from '../services/todo.service';
import { QUERY_KEYS } from '../modules/common/consts/app-keys.const';
import { Todo } from '../modules/common/types/todo.types';

export function useGetTodo(todoId: Todo['id']) {
  return useQuery({
    queryKey: [QUERY_KEYS.TODO, todoId],
    queryFn: async () => {
      const result = await todoService.getTodo(todoId);
      return result;
    }
  });
}
