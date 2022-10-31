import { useState, useEffect } from "react";

import { datePreferences, organizeStageBranches } from "../fixturePageHelpers";
import { getFixtureByStageId } from "api/fixture";
import { getFlagUrl, parseDate } from "../../pagesHelpers";
import useCleanupController from "hooks/useCleanupController";

import { Text } from "common/common.styles";
import { StageColumn, MatchData, Match } from "./laterStages.styles";

function StageMatches({ stageName, isFirst }) {
  const [isLoading, setIsLoading] = useState(false);
  const [fixtureData, setFixtureData] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    setIsLoading(true);
    getFixtureByStageId(stageName, signal)
      .then((res) => {
        const rawStage = res.data.fixture;
        const organizedBranches = organizeStageBranches(stageName, rawStage);
        const thisStage = isFirst
          ? organizedBranches.left
          : organizedBranches.right;
        setFixtureData(thisStage);
      })
      .catch((err) => handleCancel(err))
      .finally(() => setIsLoading(false));
    return cleanup;
  }, []);

  return (
    <StageColumn>
      {!isLoading &&
        fixtureData[0] &&
        fixtureData.map((match) => (
          <Match key={match.id}>
            {parseDate(match.date, datePreferences)}
            <MatchData>
              {getFlagUrl(match.home?.flag, 1)}
              <Text>{match.homeScore}</Text>
              <span>-</span>
              <Text>{match.awayScore}</Text>
              {getFlagUrl(match.away?.flag, 1)}
            </MatchData>
          </Match>
        ))}
    </StageColumn>
  );
}

export default StageMatches;
