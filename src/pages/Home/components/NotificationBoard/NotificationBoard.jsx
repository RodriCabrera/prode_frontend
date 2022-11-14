import { useEffect, useState, useContext } from "react";

import { getPredictionCount } from "../../../../api/predictions";
import { NoGroupNotification } from "./NoGroupNotification";
import { NoPredictionNotification } from "./NoPredictionNotification";
import { UsernameNotification } from "./UsernameNotification";
import { useGetUserGroupsData } from "../../../../hooks/useGetUserGroupsData";
import useCleanupController from "../../../../hooks/useCleanupController";
import { AuthContext } from "../../../../common/AuthProvider";

import { CardContainer, CardWrapper } from "../../../../common/common.styles";

function NotificationBoard() {
  const [hasPredictions, setHasPredictions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { userGroupList, isLoadingUserGroupsData } = useGetUserGroupsData();
  const userContext = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getPredictionCount(signal)
      .then((res) => res.data?.userPredictions > 0 && setHasPredictions(true))
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);
  if (isLoading) return null;

  function renderBoards() {
    // NAME IS EMAIL:
    if (userContext?.user?.email && userContext.user.name.includes("@"))
      return <UsernameNotification />;
    // NO GROUP - NO PREDICTIONS:
    if (!isLoadingUserGroupsData && userGroupList.length === 0)
      return <NoGroupNotification />;
    // YES GROUPS - NO PREDICTIONS:
    else if (!isLoading && !hasPredictions) {
      return <NoPredictionNotification />;
    } else return null;
  }

  // YES GROUP - YES PREDICTION - USERNAME OK:
  if (hasPredictions && !isLoading) return null;

  return (
    <CardContainer>
      <CardWrapper width="100%" isMobile border="none">
        {renderBoards()}
      </CardWrapper>
    </CardContainer>
  );
}

export default NotificationBoard;
