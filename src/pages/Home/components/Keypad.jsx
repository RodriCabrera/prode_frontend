import { IoIosFootball } from 'react-icons/io';
import { HiOutlineUserGroup } from 'react-icons/hi';
import {
  GiPodiumWinner,
  GiAbstract018,
  GiBodyBalance,
  GiBookStorm,
} from 'react-icons/gi';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../common/common.styles';

const KeypadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 190px;
  gap: 1rem;
`;
const KeypadRow = styled.div`
  display: flex;
  gap: 1rem;
`;

function Keypad() {
  const navigate = useNavigate();
  return (
    <KeypadWrapper>
      <KeypadRow>
        {/* TODO: BTN: Va a gestion de grupos? O directamente hacemos shortcut a
        agregar un nuevo grupo? */}
        <Button padding="5px" onClick={() => navigate('/groups')}>
          <HiOutlineUserGroup size="2rem" />
        </Button>
        {/* TODO: BTN: A tabla de posiciones completa / O es lo mismo que la tabla q esta a la derecha?? */}
        <Button padding="5px">
          <GiPodiumWinner size="2rem" />
        </Button>
        {/* BNT: A fixture mas completo */}
        <Button padding="5px" onClick={() => navigate('/proximos-partidos')}>
          <IoIosFootball size="2rem" />
        </Button>
      </KeypadRow>
      {/* TODO: Ver que otros botones agregamos a la botonera */}
      <KeypadRow>
        <Button padding="5px">
          <GiAbstract018 size="2rem" />
        </Button>
        <Button padding="5px">
          <GiBodyBalance size="2rem" />
        </Button>
        <Button padding="5px">
          <GiBookStorm size="2rem" />
        </Button>
      </KeypadRow>
    </KeypadWrapper>
  );
}

export default Keypad;
