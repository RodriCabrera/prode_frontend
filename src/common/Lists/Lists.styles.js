import styled from '@emotion/styled/macro';

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  height: 2.5rem;
  width: 2.5rem;
  max-height: 2.5rem;
  max-width: 2.5rem;
  z-index: 2;
  & img {
    height: 105%;
  }
`;
export const HoverBaloon = styled.div`
  transition: 0.2s;
  height: 2.5rem;
  width: 2.5rem;
  position: absolute;
  border-radius: 100%;
  z-index: 1;
  background-color: ${({ bgColor }) => bgColor || 'darkorange'};
`;

export const ListItemWrapper = styled.div`
  display: flex;
  gap: ${({ isMobile }) => isMobile ? '0.2rem' : '1rem'};
  align-items: center;
  height: ${({ isMobile }) => isMobile ? '2.5rem' : '4rem'};
  max-height:  ${({ isMobile }) => isMobile ? '2.5rem' : '4rem'};
  transform-origin: center;
  cursor: pointer;
  :hover ${HoverBaloon} {
    transform: scale(1.1);
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;
