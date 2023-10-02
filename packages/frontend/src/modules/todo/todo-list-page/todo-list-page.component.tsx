import React, { useState } from 'react';
import { useDevice, useGetTodos } from '../../../hooks';
import { MainLayoutComponent } from '../../common/components/Layouts';
import { FilterBarComponent } from '../components/todo-filter-bar';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { TodoSliderComponent } from '../components/todo-slider';
import { TodoTableComponent } from '../components/todo-table';
import { AddTodoForm } from '../components/todo-forms/add-form';
import { Modal } from '../../common/components/modal';
import { BREAKPOINTS } from '../../theme';

import * as Styled from './todo-list-page.styled';

export const TodoListPageComponent = () => {
  const { status, data, error } = useGetTodos();
  const dataSuccess = status === 'success' && !!data;
  const { isDesktop, isTablet, isMobile } = useDevice({
    mobile: BREAKPOINTS.mobile,
    tablet: BREAKPOINTS.tablet,
    desktop: BREAKPOINTS.desktop
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickAddTodo = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MainLayoutComponent>
      <FilterBarComponent />
      <Styled.ButtonAdd type="button" onClick={handleClickAddTodo}>
        Add Todo
      </Styled.ButtonAdd>
      {status === 'loading' && <Styled.Loader />}
      {status === 'error' && (
        <Styled.ErrorText $size="m">
          Error: {error instanceof Error ? error.message : error}
        </Styled.ErrorText>
      )}
      {dataSuccess && isMobile && <TodoListComponent data={data} />}
      {dataSuccess && isTablet && <TodoSliderComponent data={data} />}
      {dataSuccess && isDesktop && <TodoTableComponent data={data} />}
      <Modal isOpen={isModalOpen} onClose={closeModal} isClose>
        <AddTodoForm onCancel={closeModal} />
      </Modal>
    </MainLayoutComponent>
  );
};
