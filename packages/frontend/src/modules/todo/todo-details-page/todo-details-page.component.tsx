import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTodo } from '../../../hooks';
import { MainLayoutComponent } from '../../common/components/Layouts';
import { TodoDetailsComponent } from '../components/todo-details/todo-details.component';

import * as Styled from './todo-details-page.styled';

export const TodoDetailsPageComponent = () => {
  const { todoId } = useParams<{ todoId: string }>();
  const { status, data, error } = useGetTodo(todoId);
  return (
    <MainLayoutComponent>
      {status === 'loading' && <Styled.Loader />}
      {status === 'error' && (
        <Styled.ErrorText $size="m">
          Error: {error instanceof Error ? error.message : error}
        </Styled.ErrorText>
      )}
      {status === 'success' && data && <TodoDetailsComponent data={data} />}
    </MainLayoutComponent>
  );
};
