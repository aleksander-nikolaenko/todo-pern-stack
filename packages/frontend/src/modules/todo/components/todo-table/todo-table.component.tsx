import React from 'react';
import { TodoButtonActionsComponent } from '../todo-button-actions';
import { Todo } from '../../../common/types';

import * as Styled from './todo-table.styled';

interface TodoTableProps {
  data: Todo[] | undefined;
}

export const TodoTableComponent = ({ data }: TodoTableProps) => {
  const isData = data?.length !== 0;
  return isData ? (
    <Styled.Table>
      <thead>
        <tr>
          <Styled.HeaderCol>Todo Title</Styled.HeaderCol>
          <Styled.HeaderCol>Description</Styled.HeaderCol>
          <Styled.HeaderCol>Actions</Styled.HeaderCol>
        </tr>
      </thead>

      <tbody>
        {data?.map((rowData) => (
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
  ) : (
    <p>Not found todos</p>
  );
};
