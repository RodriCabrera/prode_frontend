import { useState, useEffect } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { groupNumberMod, numberToGroupLetter } from "../predictionsPageUtils";

import { Button } from "../../../common/common.styles";
import { FormButtonWrapper } from "../Predictions.styles";

export default function GroupSwitchButtons({ setNewGroupNumber }) {
  const { t } = useTranslation()
  const GROUP = t('groups').replace('s', '')
  const [groupNumber, setGroupNumber] = useState(0);
  const [prevGroupName, setPrevGroupName] = useState(
    () => `${GROUP} ${numberToGroupLetter(groupNumberMod(groupNumber - 1))}`
  );
  const [nextGroupName, setNextGroupName] = useState(
    () => `${GROUP} ${numberToGroupLetter(groupNumberMod(groupNumber + 1))}`
  );

  useEffect(() => {
    setPrevGroupName(
      `${GROUP} ${numberToGroupLetter(groupNumberMod(groupNumber - 1))}`
    );
    setNextGroupName(
      `${GROUP} ${numberToGroupLetter(groupNumberMod(groupNumber + 1))}`
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
