import React from 'react';
import { TodoItemComponent } from '../todo-item';
import { Todo } from '../../../common/types';

import * as Styled from './todo-list.styled';

interface TodoListProps {
  data: Todo[];
}

export const TodoListComponent = ({ data }: TodoListProps) => (
  <Styled.List>
    {data.map((todo) => (
      <TodoItemComponent key={todo.id} data={todo} />
    ))}
  </Styled.List>
);
