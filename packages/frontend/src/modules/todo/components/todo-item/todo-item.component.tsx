import React from 'react';
import { TitleComponent } from '../../../common/components/title';
import { Todo } from '../../../common/types/todo.types';

import * as Styled from './todo-item.styled';
import { TodoButtonActionsComponent } from '../todo-button-actions';

interface TodoItemProps {
  data: Todo;
}

export const TodoItemComponent = ({ data }: TodoItemProps) => {
  const { title, description } = data;
  return (
    <Styled.ListItem>
      <TitleComponent size="m" title={title} />
      <Styled.Description>{description}</Styled.Description>
      <TodoButtonActionsComponent data={data} />
    </Styled.ListItem>
  );
};
