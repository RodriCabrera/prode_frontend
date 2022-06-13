import styled from '@emotion/styled';

export const NavbarContainer = styled.div`
  backdrop-filter: blur(5px);
  background-color: #21212190;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
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
  gap: 1rem 0rem;
`;

export const LogoMain = styled.p`
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
  color: #f5f5f5;
  letter-spacing: 4px;
  text-shadow: 0px -2px 4px #fff, 0px -2px 10px #ff3, 0px -10px 20px #f90,
    0px -20px 40px #c33;
`;

export const LogoSub = styled(LogoMain)`
  letter-spacing: 1px;
`;

/*
Colores:
#fff: blanco
#ff3: amarillo
#f90: naranja
#c33: rojo
*/
