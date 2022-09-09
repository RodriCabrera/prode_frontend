import React from 'react';
import { useFetchFixtureData } from '../../FixturePage/hooks/useFetchFixtureData';
import Navigator from '../../../common/Navigator/Navigator';
import { BallLoader } from '../../../common/Spinner/BallLoader';

export default function MatchNavigator({ children }) {
  const { isLoading, fixtureData } = useFetchFixtureData();

  const finalCheck = (data) => {
    if (data?.home) return data;
    return false;
  };
  const parseName = (data) => {
    if (data.name) return data.name;
    if (data.home && data.away)
      return `${data.home.shortName} vs ${data.away.shortName}`;
    else return data.id;
  };

  if (isLoading) return <BallLoader />;
  return (
    <Navigator
      data={fixtureData}
      isFinalCheck={finalCheck}
      parseName={parseName}
      baseName="Qatar 2022"
    >
      {children}
    </Navigator>
  );
}
