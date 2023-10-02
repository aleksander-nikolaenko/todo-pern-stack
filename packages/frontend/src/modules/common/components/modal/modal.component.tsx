import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import * as Styled from './modal.styled';

type ModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  isClose?: boolean;
}>;

export const Modal = ({ isOpen, onClose, isClose, children }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isClose) return;

      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isClose, onClose]);

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget === event.target && isClose) {
      onClose();
    }
  };
  if (!isOpen) return null;
  return (
    isOpen &&
    ReactDOM.createPortal(
      <Styled.Backdrop onClick={handleBackdropClick}>
        <Styled.Content>
          {isClose && <Styled.CloseButton type="button" onClick={onClose} />}
          {children}
        </Styled.Content>
      </Styled.Backdrop>,
      document.getElementById('modal-root') || document.body
    )
  );
};
