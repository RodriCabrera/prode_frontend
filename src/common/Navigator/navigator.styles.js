import styled from '@emotion/styled';

export const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: stretch;
  align-items: center;
  gap: 1rem;
`;

export const NavHistory = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const NavHistoryItem = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: transparent;
  border-radius: 4px;
  padding: 0.5rem;
  margin: 0.35rem;
  text-decoration: ${({ disabled }) => (disabled ? 'underline' : 'none')};
  transition: all ease-in-out 0.15s;
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? 'transparent' : '#23272a'};
  }
`;

export const NavButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 12px;
  padding: 0.5rem;
`;

export const NavLayers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const NavContent = styled.div`
  width: 100%;
  margin-top: 1rem;
  flex: 1;
  display: flex;
  justify-content: center;
`;
