import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TitleComponent } from '../../../common/components/title';
import { APP_KEYS } from '../../../common/consts';
import { ButtonComponent } from '../../../common/components/button';
import { ButtonToggleComponent } from '../../../common/components/button-toggle';
import { Todo } from '../../../common/types/todo.types';

import * as Styled from './todo-details.styled';
import { Modal } from '../../../common/components/modal';
import { useUpdateTodo } from '../../../../hooks';
import { TodoEditFormComponent } from '../todo-forms/edit-form';

export const TodoDetailsComponent = ({ data }: { data: Todo }) => {
  const { id, title, description, isCompleted, isPrivate } = data;
  const history = useHistory();
  const { state } = useLocation<{ slide: number }>();
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const closeModal = () => {
    setIsModalOpenEdit(false);
  };
  const handleClickBack = () => {
    history.push(APP_KEYS.ROUTER_KEYS.TODO, { ...state });
  };

  const handleClickEdit = () => {
    setIsModalOpenEdit(true);
  };
  const { isError: updateError, mutate: updateMutation } = useUpdateTodo();
  const handleClickUpdateCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateMutation({ todoId: id, todo: { isCompleted: event.target.checked } });
  };
  const handleClickUpdateCompPrivate = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateMutation({ todoId: id, todo: { isPrivate: event.target.checked } });
  };
  useEffect(() => {
    if (updateError) setIsModalOpenEdit(true);
  }, [updateError]);

  return (
    <>
      <TitleComponent size="xl" title={title} />
      <Styled.SubTitleDescription>Description:</Styled.SubTitleDescription>
      <Styled.Description>{description}</Styled.Description>
      <Styled.ButtonWrapper>
        <Styled.SubTitle>Completed</Styled.SubTitle>
        <ButtonToggleComponent
          name={`${id}-c`}
          value={isCompleted}
          onChange={handleClickUpdateCompleted}
        />
      </Styled.ButtonWrapper>
      <Styled.ButtonWrapperPrivate>
        <Styled.SubTitle>Private</Styled.SubTitle>
        <ButtonToggleComponent
          name={`${id}-p`}
          value={isPrivate}
          onChange={handleClickUpdateCompPrivate}
        />
      </Styled.ButtonWrapperPrivate>
      <Styled.ButtonWrapperEdit>
        <ButtonComponent onClick={handleClickBack}>Back</ButtonComponent>
        <ButtonComponent onClick={handleClickEdit}>Edit</ButtonComponent>
      </Styled.ButtonWrapperEdit>
      <Modal isOpen={isModalOpenEdit} onClose={closeModal} isClose>
        {updateError ? (
          <Styled.ModalWrapper>
            <Styled.ModalTitle $size="m">{`Error "${data.title}" not updated`}</Styled.ModalTitle>
            <Styled.ButtonWrapperModal>
              <ButtonComponent onClick={closeModal}>Ok</ButtonComponent>
            </Styled.ButtonWrapperModal>
          </Styled.ModalWrapper>
        ) : (
          <TodoEditFormComponent todo={data} onCancel={closeModal} />
        )}
      </Modal>
    </>
  );
};
