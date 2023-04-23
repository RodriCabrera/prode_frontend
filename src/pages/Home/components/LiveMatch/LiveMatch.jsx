import { useState, useEffect } from "react";
import { CgMediaLive } from "react-icons/cg";

import { getLiveMatch } from "../../../../api/fixture";
import { LiveDisplay } from "./LiveDisplay";
import useCleanupController from "../../../../hooks/useCleanupController";

import {
  CardContainer,
  CardWrapper,
  Text,
} from "../../../../common/common.styles";

export default function LiveMatch() {
  const [matchData, setMatchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { cleanup, signal } = useCleanupController();

  useEffect(() => {
    if (matchData) return;
    setIsLoading(true);
    getLiveMatch(undefined, undefined, signal)
      .then((res) => {
        if (res.status === 204) return;
        setMatchData(res.data);
      })
      .finally(() => setIsLoading(false));
    return cleanup;
  }, []);
  if (!matchData || isLoading) return null;
  return (
    <CardContainer>
      <CardWrapper>
        <Text align="center" color="red" margin="0" size="1.5rem">
          LIVE <CgMediaLive size={18} className="pulser" />
        </Text>
        <LiveDisplay matchData={matchData} />
      </CardWrapper>
    </CardContainer>
  );
}
