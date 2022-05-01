import styled from '@emotion/styled';

export const NavbarWrapper = styled.div`
  /* background-color: #1e1e1e; */
  background: rgb(33, 33, 33);
  background: linear-gradient(
    90deg,
    rgba(33, 33, 33, 1) 0%,
    rgba(30, 30, 30, 1) 85%,
    rgba(20, 20, 20, 1) 100%
  );

  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 15px;
  position: sticky;
  top: 0;
  width: 100%;
  margin-bottom: 20px;
`;

export const ButtonGroup = styled.div`
  padding: 2rem;
  background-color: inherit;
  display: flex;
  gap: 0 1rem;
`;
