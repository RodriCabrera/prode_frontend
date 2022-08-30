import styled from '@emotion/styled';

export const NavbarContainer = styled.div`
  backdrop-filter: blur(5px);
  background-color: #21212190;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: auto;
  top: 0;
  z-index: 999;
`;

export const NavbarWrapper = styled.div`
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  max-width: 1100px;
  font-size: 15px;
  width: 100%;
  flex-wrap: wrap;
`;

export const ButtonGroup = styled.div`
  background-color: inherit;
  padding: ${({ padding }) => padding || '2rem 1rem'};
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap || '1rem'};
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 0.7rem 0rem;
`;

/*
Colores:
#fff: blanco
#ff3: amarillo
#f90: naranja
#c33: rojo
*/
