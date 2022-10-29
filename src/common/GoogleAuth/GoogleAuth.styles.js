import styled from "@emotion/styled";

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthLink = styled.button`
  background: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
export default AuthContainer;
