import React, { useEffect, useRef } from 'react';
import { Backdrop, ModalContainer, CloseModalButton } from './modal.styles';

function Modal({ children, show, toggle }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        toggle();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return show ? (
    <>
      <Backdrop />
      <ModalContainer ref={modalRef}>
        <CloseModalButton onClick={toggle} type="button">
          <span className="material-symbols-outlined">close</span>
        </CloseModalButton>
        {children}
      </ModalContainer>
    </>
  ) : null;
}

export default Modal;
