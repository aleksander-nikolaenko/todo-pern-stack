import React from 'react';

import { Todo } from '../../../common/types/todo.types';

import * as Styled from './todo-table.styled';
import { TodoButtonActionsComponent } from '../todo-button-actions';

export const TodoTableComponent = ({ data }: { data: Todo[] }) => (
  <Styled.Table>
    <thead>
      <tr>
        <Styled.HeaderCol>Todo Title</Styled.HeaderCol>
        <Styled.HeaderCol>Description</Styled.HeaderCol>
        <Styled.HeaderCol>Actions</Styled.HeaderCol>
      </tr>
    </thead>

    <tbody>
      {data.map((rowData) => (
        <Styled.BodyRow key={rowData.id}>
          <Styled.BodyCol>{rowData.title}</Styled.BodyCol>
          <Styled.BodyCol>{rowData.description}</Styled.BodyCol>
          <Styled.BodyCol>
            <TodoButtonActionsComponent data={rowData} />
          </Styled.BodyCol>
        </Styled.BodyRow>
      ))}
    </tbody>
  </Styled.Table>
);
