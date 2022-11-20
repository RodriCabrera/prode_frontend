import { BallLoader } from "../../../common/Spinner/BallLoader";
import { useFetchFixtureData } from "../../FixturePage/hooks/useFetchFixtureData";
import Navigator from "../../../common/Navigator/Navigator";

export default function MatchNavigator({ children }) {
  const { isLoading, fixtureData } = useFetchFixtureData();

  const finalCheck = (data) => {
    if (data?.matches && data?.matches?.some((match) => !match.home?.name))
      return data;
    if (data?.home) return data;
    return false;
  };
  const parseName = (data) => {
    if (data.name) return data.name;
    if (data.home && data.away)
      return `${data.home.shortName || data.home} vs ${
        data.away.shortName || data.away
      }`;
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
