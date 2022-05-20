import styled from '@emotion/styled/macro';

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkorange;
  border-radius: 100%;
  height: 2.5rem;
  width: 2.5rem;
  transition: 0.2s;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
  :hover ${AvatarWrapper} {
    background-color: orange;
    height: 3rem;
    width: 3rem;
  }
`;