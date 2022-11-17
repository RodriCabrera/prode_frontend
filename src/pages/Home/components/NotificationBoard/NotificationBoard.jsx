import { useEffect, useState, useContext } from "react";
import { MdOutlineClose } from "react-icons/md";

import { CloseModalButton } from "../../../../common/Modal/modal.styles";
import { getPredictionCount } from "../../../../api/predictions";
import { NoGroupNotification } from "./NoGroupNotification";
import { NoPredictionNotification } from "./NoPredictionNotification";
import { UsernameNotification } from "./UsernameNotification";
import { useGetUserGroupsData } from "../../../../hooks/useGetUserGroupsData";
import useCleanupController from "../../../../hooks/useCleanupController";
import { AuthContext } from "../../../../common/AuthProvider";
import { useIsMobile } from "../../../../hooks/useIsMobile";

import { CardContainer, CardWrapper } from "../../../../common/common.styles";

function NotificationBoard() {
  const [hasPredictions, setHasPredictions] = useState(false);
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { userGroupList, isLoadingUserGroupsData } = useGetUserGroupsData();
  const userContext = useContext(AuthContext);
  const isMobile = useIsMobile();

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

  if (!show) return null;
  return (
    <CardContainer>
      <CardWrapper
        padding="1.8rem"
        bg="rgba(200, 200, 200, 0.1)"
        style={{ boxShadow: "#ffeea921 0px 2px 9px 1px", minWidth: "50%" }}
        isMobile={isMobile}
      >
        <div>
          <CloseModalButton type="button" onClick={() => setShow(false)}>
            <MdOutlineClose size={24} />
          </CloseModalButton>
          {renderBoards()}
        </div>
      </CardWrapper>
    </CardContainer>
  );
}

export default NotificationBoard;
