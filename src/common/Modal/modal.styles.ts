import styled from "@emotion/styled";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 99998;
`;
export const ModalContentWrapper = styled.div`
  min-width: 200px;
  width: 100%;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
  height: 100%;
`;
export const ModalContainer = styled.div`
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35rem;
  max-width: 90vw;
  overflow-x: hidden;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  padding: 1rem;
  background-color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CloseModalButton = styled.button`
  float: right;
  align-self: flex-end;
  border: none;
  background: none;
  text-align: center;
  cursor: pointer;
  transform: translateY(-45%);
`;
