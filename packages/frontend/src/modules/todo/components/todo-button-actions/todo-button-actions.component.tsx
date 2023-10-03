import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDeleteTodo, useUpdateTodo } from '../../../../hooks';
import { ButtonComponent } from '../../../common/components/button';
import { ButtonToggleComponent } from '../../../common/components/button-toggle';
import { Todo } from '../../../common/types/todo.types';
import { Modal } from '../../../common/components/modal';

import * as Styled from './todo-button-actions.styled';
import { TodoEditFormComponent } from '../todo-forms/edit-form';

interface TodoButtonActionsProps {
  data: Todo;
}

export const TodoButtonActionsComponent = ({ data }: TodoButtonActionsProps) => {
  const { id, isCompleted } = data;
  const { url } = useRouteMatch();
  const history = useHistory();
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const { isError: deleteError, mutate: deleteMutation } = useDeleteTodo();
  const { isError: updateError, mutate: updateMutation } = useUpdateTodo();

  const handleClickUpdateCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateMutation({ todoId: id, todo: { isCompleted: event.target.checked } });
  };

  const closeModal = () => {
    setIsModalOpenDelete(false);
    setIsModalOpenEdit(false);
  };
  const handleClickView = () => {
    history.push(`${url}/${id}`);
  };
  const handleClickEdit = () => {
    setIsModalOpenEdit(true);
  };
  const handleClickDelete = () => {
    setIsModalOpenDelete(true);
  };
  const handleClickConfirm = () => {
    deleteMutation(id);
    setIsModalOpenDelete(false);
  };

  useEffect(() => {
    if (deleteError) setIsModalOpenDelete(true);
    if (updateError) setIsModalOpenEdit(true);
  }, [deleteError, updateError]);

  return (
    <>
      <Styled.ButtonWrapper>
        <ButtonComponent onClick={handleClickView}>View</ButtonComponent>
        <ButtonComponent onClick={handleClickEdit}>Edit</ButtonComponent>
        <ButtonComponent onClick={handleClickDelete}>Delete</ButtonComponent>
        <ButtonToggleComponent
          name={`${data.id}-c`}
          value={isCompleted}
          onChange={handleClickUpdateCompleted}
        />
      </Styled.ButtonWrapper>
      <Modal isOpen={isModalOpenDelete} onClose={closeModal} isClose>
        {deleteError ? (
          <Styled.ModalWrapper>
            <Styled.ModalTitle $size="m">{`Error "${data.title}" not deleted`}</Styled.ModalTitle>
            <Styled.ButtonWrapper>
              <ButtonComponent onClick={closeModal}>Ok</ButtonComponent>
            </Styled.ButtonWrapper>
          </Styled.ModalWrapper>
        ) : (
          <Styled.ModalWrapper>
            <Styled.ModalTitle $size="m">
              {`Are you sure you want to delete "${data.title}"?`}
            </Styled.ModalTitle>
            <Styled.ButtonWrapper>
              <ButtonComponent onClick={handleClickConfirm}>Confirm</ButtonComponent>
              <ButtonComponent onClick={closeModal}>Cancel</ButtonComponent>
            </Styled.ButtonWrapper>
          </Styled.ModalWrapper>
        )}
      </Modal>
      <Modal isOpen={isModalOpenEdit} onClose={closeModal} isClose>
        {updateError ? (
          <Styled.ModalWrapper>
            <Styled.ModalTitle $size="m">{`Error "${data.title}" not updated`}</Styled.ModalTitle>
            <Styled.ButtonWrapper>
              <ButtonComponent onClick={closeModal}>Ok</ButtonComponent>
            </Styled.ButtonWrapper>
          </Styled.ModalWrapper>
        ) : (
          <TodoEditFormComponent todo={data} onCancel={closeModal} />
        )}
      </Modal>
    </>
  );
};