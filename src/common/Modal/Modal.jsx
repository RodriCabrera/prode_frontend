import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';
import { Button } from '../common.styles';
import { Backdrop, ModalContainer, CloseModalButton } from './modal.styles';

const ModalContentWrapper = styled.div`
  min-width: 200px;
  width: 100%;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
`;
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
        <ModalContentWrapper>
          {children}
          <Button grayscale onClick={toggle}>
            Cancelar
          </Button>
        </ModalContentWrapper>
      </ModalContainer>
    </>
  ) : null;
}

export default Modal;
