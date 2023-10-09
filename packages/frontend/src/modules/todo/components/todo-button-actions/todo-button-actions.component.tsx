import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDeleteTodo, useUpdateTodo } from '../../../../hooks';
import { ButtonComponent } from '../../../common/components/button';
import { ButtonToggleComponent } from '../../../common/components/button-toggle';
import { Modal } from '../../../common/components/modal';
import { TodoEditFormComponent } from '../todo-forms/edit-form';
import { Todo } from '../../../common/types';
import { APP_KEYS } from '../../../common/consts';

import * as Styled from './todo-button-actions.styled';

interface TodoButtonActionsProps {
  data: Todo;
}

export const TodoButtonActionsComponent = ({ data }: TodoButtonActionsProps) => {
  const { id, isCompleted } = data;
  const userId = localStorage.getItem(APP_KEYS.STORAGE_KEYS.USER_ID);
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
    history.push(`${APP_KEYS.ROUTER_KEYS.TODO}/${id}`);
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
        <ButtonComponent disabled={userId !== data.user.id} onClick={handleClickEdit}>
          Edit
        </ButtonComponent>
        <ButtonComponent disabled={userId !== data.user.id} onClick={handleClickDelete}>
          Delete
        </ButtonComponent>
        <ButtonToggleComponent
          name={`${data.id}-c`}
          checked={isCompleted}
          disabled={userId !== data.user.id}
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
