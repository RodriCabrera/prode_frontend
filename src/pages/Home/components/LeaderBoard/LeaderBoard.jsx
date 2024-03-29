import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { BallLoader } from "../../../../common/Spinner/BallLoader";
import { getUserGroups } from "../../../../api/groups";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import Leader from "./Leader";
import useCleanupController from "../../../../hooks/useCleanupController";

import { CardTitle, CardWrapper, Text } from "../../../../common/common.styles";

const LeaderBoard = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    getUserGroups(signal)
      .then((res) => {
        setUserGroups(res?.data?.slice(0, 5));
      })
      .catch((err) => handleCancel(err))
      .finally(() => setIsLoading(false));
    return cleanup;
  }, []);

  return (
    <CardWrapper
      width="290px"
      border={isMobile ? "none" : undefined}
      minHeight="300px"
    >
      <CardTitle>{t("leaderBoard")}</CardTitle>
      {isLoading || !userGroups ? (
        <BallLoader />
      ) : userGroups.length > 0 ? (
        userGroups.map((group) => (
          <Leader
            key={group.name}
            group={group}
            isUnique={userGroups.length < 2}
          />
        ))
      ) : (
        <>
          <Text
            weight="600"
            size="1rem"
            color="gray"
            align="center"
            margin="1rem"
          >
            {t("noGroups")}
          </Text>
          <Text align="center" margin="1rem 0">
            {t("canFindOrCreate")} <br />
            <Link to="/groups/">{t("thisSection")}</Link>
          </Text>
        </>
      )}
    </CardWrapper>
  );
};

export default LeaderBoard;
