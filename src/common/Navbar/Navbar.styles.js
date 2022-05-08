import styled from '@emotion/styled';

export const NavbarContainer = styled.div`
  backdrop-filter: blur(10px);
  background-color: #21212190;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
`;
export const NavbarWrapper = styled.div`
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  max-width: 1100px;
  font-size: 15px;
  width: 100%;
`;

export const ButtonGroup = styled.div`
  background-color: inherit;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 0 1rem;
`;
