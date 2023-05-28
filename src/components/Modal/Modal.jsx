import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, DivModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const closeModal = ({ code }) => {
      if (code === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [onClose]);

  const handleCloseModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handleCloseModal}>
      <DivModal>{children}</DivModal>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
