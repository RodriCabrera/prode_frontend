import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { useFlags } from "flagsmith/react";
import { useTranslation } from "react-i18next";

import { UserMiniAvatar } from "../../../common/UserMiniAvatar/UserMiniAvatar";
import { getGroupScores } from "../../../api/groups";
import { ListElement } from "../../../common/Lists/ListElement";
import useToggleModal from "../../../hooks/useToggleModal";
import LeaveGroupForm from "./LeaveGroupForm";
import GroupRules from "./GroupRules";
import GroupInvite from "./GroupInvite";
import AdminPanel from "./AdminPanel";
import { AuthContext } from "../../../common/AuthProvider";
import { GoBackButton } from "../../../common/GoBackButton/GoBackButton";
import useCleanupController from "../../../hooks/useCleanupController";
import { useIsMobile } from "../../../hooks/useIsMobile";

import Modal from "../../../common/Modal/Modal";
import {
  Text,
  CardContainer,
  Button,
  CardWrapper,
} from "../../../common/common.styles";
import { Spinner } from "../../../common/Spinner/Spinner";

function InGroup({ groupData, updater }) {
  const navigate = useNavigate();
  const [groupScoresData, setGroupScoresData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { showModal, toggleModal } = useToggleModal();
  const userContext = useContext(AuthContext);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();
  const flags = useFlags(["show_admin_functions"]);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    if (!groupData.name) return;
    getGroupScores(groupData.name, signal)
      .then((res) => {
        setGroupScoresData(res.data);
      })
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);

  const onGroupExit = () => {
    navigate("/groups");
  };

  const handleUserClick = (user) => {
    if (user === userContext.user.name) return navigate("/profile/");
    return navigate(`/profile/${user}`);
  };

  const toggleAdminPanel = () => {
    setShowAdminPanel((prev) => !prev);
  };

  const isAdmin = userContext.user._id === groupData.owner._id;
  const isAdminAlone = isAdmin && groupData.members.length === 1;

  return (
    <CardContainer>
      <CardWrapper border="none" isMobile={true}>
        <GoBackButton />

        <Text size="2.5rem" align="center" weight="800">
          {groupData?.name}
        </Text>
        {isAdmin && flags.show_admin_functions.enabled && (
          <Button
            onClick={toggleAdminPanel}
            tertiary={showAdminPanel}
            width="fit-content"
            padding="10px"
          >
            {showAdminPanel
              ? t('adminPanelHide')
              : t('adminPanelShow')}
          </Button>
        )}

        {showAdminPanel ? (
          <AdminPanel groupData={groupData} updater={updater} />
        ) : (
          <GroupRules rules={groupData?.rules} />
        )}

        {isLoading && <Spinner />}

        {!showAdminPanel && groupScoresData.group && (
          <>
            <Text size="1.2rem" weight="600" withBottomBorder>
              {t('members')}:
            </Text>
            <Text size=".8rem" weight={100}>
              (👑 admin)
            </Text>
            {isEmpty(groupScoresData)
              ? "Loading..."
              : groupScoresData.scores?.map((score) => {
                  const isAdmin = score.user === groupScoresData.group.owner;
                  return (
                    <ListElement
                      onClick={() => handleUserClick(score.user)}
                      key={score.user}
                      avatar={
                        <UserMiniAvatar
                          avatar={score.avatar}
                          name={score.user}
                        />
                      }
                      isMobile={isMobile}
                    >
                      <Text>{`${isAdmin ? "👑" : ""} ${score.user} : ${
                        score.score
                      } pts`}</Text>
                    </ListElement>
                  );
                })}
            <GroupInvite />
            <CardContainer>
              {isAdminAlone ? (
                <Button tertiary onClick={toggleModal}>
                  {t('deleteGroup')}
                </Button>
              ) : (
                <Button grayscale onClick={toggleModal}>
                  {t('exitGroup')}
                </Button>
              )}
            </CardContainer>
            <Modal show={showModal} toggle={toggleModal}>
              <LeaveGroupForm
                updater={onGroupExit}
                toDelete={isAdminAlone && groupData.id}
              />
            </Modal>
          </>
        )}
      </CardWrapper>
    </CardContainer>
  );
}

export default InGroup;
