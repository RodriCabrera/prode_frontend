import styled from '@emotion/styled/macro';

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || 'darkorange'};
  border-radius: 100%;
  height: 2.5rem;
  width: 2.5rem;
  transition: 0.2s;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  :hover ${AvatarWrapper} {
    /* background-color: orange; */
    height: 3rem;
    width: 3rem;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
