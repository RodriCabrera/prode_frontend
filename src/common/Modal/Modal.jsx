import React, { useState, useEffect, useRef } from 'react';
import { Backdrop, ModalContainer, CloseModalButton } from './modal.styles';

function Modal({ children, show }) {
  const modalRef = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen((value) => {
      if (show && !value) return true;
      if (!show && value) return false;
      return value;
    });
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return open ? (
    <>
      <Backdrop />
      <ModalContainer ref={modalRef}>
        <CloseModalButton onClick={() => setOpen(false)} type="button">
          <span className="material-symbols-outlined">close</span>
        </CloseModalButton>
        {children}
      </ModalContainer>
    </>
  ) : null;
}

export default Modal;
