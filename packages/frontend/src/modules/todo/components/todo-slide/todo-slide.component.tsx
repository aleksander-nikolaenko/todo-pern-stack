import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDeleteTodo, useUpdateTodo } from '../../../../hooks';
import { TitleComponent } from '../../../common/components/title';
import { ButtonComponent } from '../../../common/components/button';
import { ButtonToggleComponent } from '../../../common/components/button-toggle';
import { Modal } from '../../../common/components/modal';
import { TodoEditFormComponent } from '../todo-forms/edit-form';
import { Todo } from '../../../common/types/todo.types';

import * as Styled from './todo-slide.styled';

interface TodoSlideProps {
  data: Todo;
  slide: number;
}

export const TodoSlideComponent = ({ slide, data }: TodoSlideProps) => {
  const { id, title, description, isCompleted } = data;
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
    history.push(`${url}/${id}`, { slide });
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
  return (
    <>
      <Styled.SlideWrapper>
        <TitleComponent size="m" title={title} />
        <Styled.Description>{description}</Styled.Description>
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
      </Styled.SlideWrapper>
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
