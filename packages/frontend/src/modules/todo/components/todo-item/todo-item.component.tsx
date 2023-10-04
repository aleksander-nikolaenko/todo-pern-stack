import React from 'react';
import { TitleComponent } from '../../../common/components/title';
import { TodoButtonActionsComponent } from '../todo-button-actions';
import { Todo } from '../../../common/types';

import * as Styled from './todo-item.styled';

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
