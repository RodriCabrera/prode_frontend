import styled from '@emotion/styled';

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;
export default AuthContainer;
