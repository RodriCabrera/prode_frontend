import React, { useState, useEffect } from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { Button } from '../../../common/common.styles';
import { FormButtonWrapper } from '../Predictions.styles';
import { groupNumberMod, numberToGroupLetter } from '../predictionsPageUtils';

export default function GroupSwitchButtons({ setNewGroupNumber }) {
  const [groupNumber, setGroupNumber] = useState(0);
  const [prevGroupName, setPrevGroupName] = useState(
    () => `Grupo ${numberToGroupLetter(groupNumberMod(groupNumber - 1))}`
  );
  const [nextGroupName, setNextGroupName] = useState(
    () => `Grupo ${numberToGroupLetter(groupNumberMod(groupNumber + 1))}`
  );

  useEffect(() => {
    setPrevGroupName(
      `Grupo ${numberToGroupLetter(groupNumberMod(groupNumber - 1))}`
    );
    setNextGroupName(
      `Grupo ${numberToGroupLetter(groupNumberMod(groupNumber + 1))}`
    );
    setNewGroupNumber(groupNumber);
  }, [groupNumber]);

  const handleGroupSwitch = (dir) => {
    setGroupNumber((prevNumber) => prevNumber + dir);
  };

  return (
    <FormButtonWrapper>
      <Button grayscale onClick={() => handleGroupSwitch(-1)}>
        <MdOutlineChevronLeft size={26} />
        {prevGroupName}
      </Button>
      <Button grayscale onClick={() => handleGroupSwitch(1)}>
        {nextGroupName}
        <MdOutlineChevronRight size={26} />
      </Button>
    </FormButtonWrapper>
  );
}
