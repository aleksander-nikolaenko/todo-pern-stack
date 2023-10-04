import { useMutation, useQueryClient } from 'react-query';
import todoService from '../../services/todo.service';
import { QUERY_KEYS } from '../../modules/common/consts/app-keys.const';
import { CreateTodo } from '../../modules/common/types';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: CreateTodo) => {
      await todoService.createTodo(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TODOS);
    }
  });
};
