// import { useQuery } from 'react-query';
import { useInfiniteQuery } from 'react-query';
import todoService from '../../services/todo.service';
import { QUERY_KEYS } from '../../modules/common/consts/app-keys.const';
import { GetTodosQueryParams, GetTodosResponse } from '../../modules/common/types';

export function useInfiniteTodos(queryParams: GetTodosQueryParams) {
  const { status, search, page, limit } = queryParams;
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.INFINITE_TODOS, status, search],
    queryFn: async ({ pageParam = page }) => {
      const response = await todoService.getTodos({ status, search, page: pageParam, limit });
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.pagination.totalPages) {
        return allPages.length + 1;
      }
    }
  });

  const todos = query.data?.pages.reduce(
    (acc: GetTodosResponse['todos'], todosPage) => acc.concat(todosPage.todos),
    []
  );

  return { ...query, unwrapData: todos };
}
