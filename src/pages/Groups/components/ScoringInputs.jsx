import React from "react";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";

import { Input, Text } from "../../../common/common.styles";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
`;

const InputAndText = styled.div`
  /* flex-grow: 1; */
  height: 100%;
  flex-wrap: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

function ScoringInputs({ values, handleChange, disable=false }) {
  const { t } = useTranslation();
  return (
    <InputWrapper>
      <InputAndText>
        <Text align="center" size="0.8rem">
          {t('resultExact')}
        </Text>
        <Input
          name="scoringFull"
          value={values.scoringFull}
          onChange={handleChange}
          type="number"
          width="50%"
          align="center"
          disabled={disable}
        />
      </InputAndText>
      <InputAndText>
        <Text align="center" size="0.8rem">
        {t('resultWinner')}
        </Text>
        <Input
          name="scoringWinner"
          value={values.scoringWinner}
          onChange={handleChange}
          type="number"
          width="50%"
          align="center"
          disabled={disable}
        />
      </InputAndText>
      <InputAndText>
        <Text align="center" size="0.8rem">
        {t('resultNone')}
        </Text>
        <Input
          name="scoringNone"
          value={values.scoringNone}
          onChange={handleChange}
          type="number"
          width="50%"
          align="center"
          disabled={disable}
        />
      </InputAndText>
    </InputWrapper>
  );
}

export default ScoringInputs;
