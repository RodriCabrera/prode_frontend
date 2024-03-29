import { useEffect, useState } from "react";
import { getFixture } from "../../../api/fixture";
import useCleanupController from "../../../hooks/useCleanupController";

export function useFetchFixtureData() {
  const [isLoading, setIsLoading] = useState(false);
  const [fixtureData, setFixtureData] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    setIsLoading(true);
    getFixture(undefined, undefined, signal)
      .then((res) => {
        setFixtureData(res.data.fixture);
      })
      .catch((err) => {
        handleCancel(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);

  return { isLoading, fixtureData };
}
