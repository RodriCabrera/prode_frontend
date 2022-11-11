import React, { useEffect, useState } from "react";

import { getAvatars } from "api/profiles";
import { Spinner } from "common/Spinner/Spinner";
import useCleanupController from "hooks/useCleanupController";
import useToggleModal from "../../../hooks/useToggleModal";

import Modal from "../../../common/Modal/Modal";
import {
  Container,
  AvatarWrapper,
  Avatar,
  AvatarListContainer,
} from "../profile.styles";
import { Button } from "common/common.styles";
import { t } from "i18next";

function AvatarList({ handleNewAvatar }) {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { showModal, toggleModal } = useToggleModal();

  useEffect(() => {
    if (showModal) {
      setIsLoading(true);
      getAvatars(signal)
        .then((res) => setAvatars(res.data))
        .catch((err) => handleCancel(err))
        .finally(() => setIsLoading(false));
    }
    return cleanup;
  }, [showModal]);

  const handleAvatarClick = (avatar) => {
    handleNewAvatar(avatar);
    toggleModal();
  };
  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button
            type="button"
            padding="10px"
            weight="400"
            onClick={toggleModal}
            style={{ width: "100%" }}
          >
            {t("orChooseFromList")}
          </Button>
          <Modal
            show={showModal}
            toggle={toggleModal}
            backdrop={false}
            cancelText={t("goBack")}
          >
            <AvatarListContainer id="avatar-list-container">
              {avatars.map((avatar) => {
                return (
                  <AvatarWrapper
                    key={avatar}
                    onClick={() => handleAvatarClick(avatar)}
                  >
                    <Avatar selected={true} src={avatar} alt="avatar" />
                  </AvatarWrapper>
                );
              })}
            </AvatarListContainer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default AvatarList;
