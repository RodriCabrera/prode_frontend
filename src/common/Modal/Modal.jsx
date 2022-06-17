import styled from '@emotion/styled';
import React, { useState, useEffect, useRef } from 'react';

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 450px;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  padding: 1rem;
  background-color: rgb(0, 0, 0);
`;

const CloseModalButton = styled.button`
  float: right;
  border: none;
  background: none;
  text-align: center;
  cursor: pointer;
  transform: translateY(-45%);
`;

function Modal({ children, show }) {
  const modalRef = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen((value) => !value);
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
