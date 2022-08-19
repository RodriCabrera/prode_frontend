import { useEffect, useState } from 'react';
import { getGroupStage } from '../../../api/fixture';

export function useFetchFixtureData() {
  const [isLoading, setIsLoading] = useState(false);
  const [fixtureData, setFixtureData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getGroupStage()
      .then((res) => {
        setFixtureData(res.data.fixture);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isLoading, fixtureData };
}
