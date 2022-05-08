import { IoIosFootball } from 'react-icons/io';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { GiPodiumWinner } from 'react-icons/gi';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../common/common.styles';

const KeypadWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

function Keypad() {
  const navigate = useNavigate();
  return (
    <KeypadWrapper>
      <Button padding="5px" onClick={() => navigate('/groups')}>
        <HiOutlineUserGroup size="1.5rem" />
      </Button>
      <Button padding="5px">
        <GiPodiumWinner size="1.5rem" />
      </Button>
      <Button padding="5px" onClick={() => navigate('/proximos-partidos')}>
        <IoIosFootball size="1.5rem" />
      </Button>
      <Button padding="5px">1</Button>
      <Button padding="5px">1</Button>
      <Button padding="5px">1</Button>
    </KeypadWrapper>
  );
}

export default Keypad;
