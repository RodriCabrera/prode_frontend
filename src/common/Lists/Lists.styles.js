import styled from '@emotion/styled/macro';

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || 'darkorange'};
  border-radius: 100%;
  height: 2.5rem;
  width: 2.5rem;
  max-height: 2.5rem;
  max-width: 2.5rem;
  padding: 2px;
  transition: 0.2s;
  & img {
    height: 105%;
  }
`;

export const ListItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 4rem;
  max-height: 4rem;
  cursor: pointer;
  :hover ${AvatarWrapper} {
    padding: 5px;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;
