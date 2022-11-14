import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import GroupRules from "./GroupRules";
import { getGroupRules, joinGroup } from "../../../api/groups";
import useCleanupController from "../../../hooks/useCleanupController";

import { GoBackButton } from "../../../common/GoBackButton/GoBackButton";
import { Spinner } from "../../../common/Spinner/Spinner";
import {
  CardContainer,
  Button,
  CardWrapper,
  CardTitle,
} from "../../../common/common.styles";

function NotInGroup({ name, updater }) {
  const [isLoading, setIsLoading] = useState(false);
  const [groupRules, setGroupRules] = useState();
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    getGroupRules(name, signal)
      .then((res) => {
        setGroupRules(res.data);
      })
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);

  const handleJoin = () => {
    setIsLoading(true);
    toast.promise(
      joinGroup(name)
        .then(() => updater())
        .finally(() => setIsLoading(false)),
      {
        pending: `${t("joiningGroup")}`,
        success: `${t("joinedGroup")}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  if (isLoading) return <Spinner />;
  return (
    <CardContainer>
      <CardWrapper isMobile={true} border="none">
        <GoBackButton />
        <CardTitle size="2.5rem" align="center">
          {name}
        </CardTitle>
        {groupRules && <GroupRules rules={groupRules} />}
        <CardContainer>
          <Button onClick={handleJoin}>{t("join")}</Button>
        </CardContainer>
      </CardWrapper>
    </CardContainer>
  );
}

export default NotInGroup;
