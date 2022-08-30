import React from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { Button } from '../../../common/common.styles';
import { FormButtonWrapper } from '../Predictions.styles';

const GroupSwitchButtons = ({
  handlePrevGroup,
  handleNextGroup,
  prevGroupName,
  nextGroupName,
}) => {
  return (
    <FormButtonWrapper>
      <Button grayscale onClick={handlePrevGroup} type="reset">
        <MdOutlineChevronLeft size={26} />
        {prevGroupName}
      </Button>
      <Button grayscale onClick={handleNextGroup} type="reset">
        {nextGroupName}
        <MdOutlineChevronRight size={26} />
      </Button>
    </FormButtonWrapper>
  );
};

export default GroupSwitchButtons;
