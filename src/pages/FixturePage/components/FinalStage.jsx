import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { getFixtureByStageId } from "../../../api/fixture";
import { StageColumn, MatchData, Match } from "./laterStages.styles";
import { getFlagUrl, parseDate } from "../../pagesHelpers";
import { datePreferences } from "../fixturePageHelpers";
import { Text } from "../../../common/common.styles";
import useCleanupController from "../../../hooks/useCleanupController";
import WordlCup from "./WorldCup.png";

const CupImg = styled.img`
  width: 100px;
  height: 100px;
  background-image: radial-gradient(circle, silver, transparent 70%);
`;

function FinalStage() {
  const [finalData, setFinalData] = useState([]);
  const [thirdData, setThirdData] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    getFixtureByStageId("FINAL", signal)
      .then((res) => {
        setFinalData(res.data.fixture[0]);
      })
      .catch((err) => {
        handleCancel(err);
      });
    getFixtureByStageId("TERCER_PUESTO", signal)
      .then((res) => {
        setThirdData(res.data.fixture[0]);
      })
      .catch((err) => {
        handleCancel(err);
      });
    return cleanup;
  }, []);

  return (
    <StageColumn isCenter>
      <Match>
        <h6>FINAL</h6>
        {finalData && (
          <>
            {parseDate(finalData.date, datePreferences)}
            <MatchData>
              {getFlagUrl(finalData.home?.flag, 1)}
              <Text>{finalData.homeScore}</Text>
              <span>-</span>
              <Text>{finalData.awayScore}</Text>
              {getFlagUrl(finalData.away?.flag, 1)}
            </MatchData>
          </>
        )}
      </Match>
      <div>
        <CupImg
          src={WordlCup}
          alt="Copa del mundo"
          width="100px"
          height="100px"
        />
      </div>
      <Match>
        <h6>TERCER PUESTO</h6>
        {thirdData && (
          <>
            {parseDate(thirdData.date, datePreferences)}
            <MatchData>
              {getFlagUrl(thirdData.home?.flag, 1)}
              {thirdData.homeScore}
              <span>-</span>
              {thirdData.awayScore}
              {getFlagUrl(thirdData.away?.flag, 1)}
            </MatchData>
          </>
        )}
      </Match>
    </StageColumn>
  );
}

export default FinalStage;
