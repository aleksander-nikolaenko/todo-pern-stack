import { useMutation, useQueryClient } from 'react-query';
import todoService from '../services/todo.service';
import { QUERY_KEYS } from '../modules/common/consts/app-keys.const';
import { Todo, UpdateTodo } from '../modules/common/types/todo.types';

interface Values {
  todoId: Todo['id'];
  todo: UpdateTodo;
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Values) => {
      const { todoId, todo } = values;
      await todoService.updateTodo(todoId, todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TODOS);
      queryClient.invalidateQueries(QUERY_KEYS.TODO);
    }
  });
};
