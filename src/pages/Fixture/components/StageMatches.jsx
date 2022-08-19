import React, { useState, useEffect } from 'react';
import { getFixtureByStageId } from '../../../api/fixture';
import { StageColumn, MatchData, Match } from './laterStages.styles';
import { datePreferences, organizeStageBranches } from '../fixturePageHelpers';
import { getFlagUrl, parseDate } from '../../pagesHelpers';

function StageMatches({ stageName, isFirst }) {
  const [isLoading, setIsLoading] = useState(false);
  const [fixtureData, setFixtureData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getFixtureByStageId(stageName)
      .then((res) => {
        const rawStage = res.data.fixture;
        const organizedBranches = organizeStageBranches(stageName, rawStage);
        const thisStage = isFirst
          ? organizedBranches.left
          : organizedBranches.right;
        setFixtureData(thisStage);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    !isLoading && (
      <StageColumn>
        {fixtureData[0] &&
          fixtureData.map((match) => (
            <Match key={match.id}>
              {match.home.name ? (
                <>
                  {parseDate(match.date, datePreferences)}
                  <MatchData>
                    {getFlagUrl(match.home?.flag, 1)}
                    {match.homeScore}
                    <span>-</span>
                    {match.awayScore}
                    {getFlagUrl(match.away?.flag, 1)}
                  </MatchData>
                </>
              ) : (
                <h6>{match.home}</h6>
              )}
            </Match>
          ))}
      </StageColumn>
    )
  );
}

export default StageMatches;
