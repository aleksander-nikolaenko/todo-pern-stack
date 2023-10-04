import { useMutation, useQueryClient } from 'react-query';
import todoService from '../../services/todo.service';
import { QUERY_KEYS } from '../../modules/common/consts/app-keys.const';
import { Todo } from '../../modules/common/types';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: Todo['id']) => {
      await todoService.deleteTodo(todoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TODOS);
    }
  });
};
