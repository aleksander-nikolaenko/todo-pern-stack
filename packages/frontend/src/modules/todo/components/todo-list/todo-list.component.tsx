import React from 'react';
import { TodoItemComponent } from '../todo-item';
import { Todo } from '../../../common/types';

import * as Styled from './todo-list.styled';

interface TodoListProps {
  data: Todo[] | undefined;
}

export const TodoListComponent = ({ data }: TodoListProps) => (
  <Styled.List>
    {data?.length !== 0 ? (
      data?.map((todo) => <TodoItemComponent key={todo.id} data={todo} />)
    ) : (
      <p>Not found todos</p>
    )}
  </Styled.List>
);
