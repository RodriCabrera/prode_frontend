import { useEffect, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";

import {
  Backdrop,
  ModalContainer,
  CloseModalButton,
  ModalContentWrapper,
} from "./modal.styles";
import { Button } from "../common.styles";

interface IModalProps {
  children: JSX.Element;
  show: boolean;
  toggle: () => void;
  backdrop: boolean;
  cancelText: string;
}
function Modal({
  children,
  show,
  toggle,
  backdrop = true,
  cancelText = "Cancelar",
}: IModalProps) {
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
      {backdrop && <Backdrop />}
      <ModalContainer ref={modalRef}>
        <CloseModalButton onClick={toggle} type="button">
          <MdOutlineClose size={24} />
        </CloseModalButton>
        <ModalContentWrapper>
          {children}
          <Button grayscale onClick={toggle}>
            {cancelText}
          </Button>
        </ModalContentWrapper>
      </ModalContainer>
    </>
  ) : null;
}

export default Modal;
