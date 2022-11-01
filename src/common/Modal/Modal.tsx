import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { MdOutlineClose } from "react-icons/md";

import { Backdrop, ModalContainer, CloseModalButton } from "./modal.styles";
import { Button } from "../common.styles";

const ModalContentWrapper = styled.div`
  min-width: 200px;
  width: 100%;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
`;
interface IModalProps {
  children: JSX.Element;
  show: boolean;
  toggle: () => void;
}
function Modal({ children, show, toggle }: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // @ts-expect-error blah
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        toggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return show ? (
    <>
      <Backdrop />
      <ModalContainer ref={modalRef}>
        <CloseModalButton onClick={toggle} type="button">
          <MdOutlineClose size={24} />
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
