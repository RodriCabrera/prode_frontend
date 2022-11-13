import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { t } from "i18next";

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
  PaginationContainer,
} from "../profile.styles";
import { Button } from "common/common.styles";

const StyledButton = styled(Button)`
  background: black;
  :disabled {
    border: 1px solid gray;
    color: gray;
  }
`;

function AvatarList({ handleNewAvatar }) {
  const [avatars, setAvatars] = useState([]);
  const [page, setPage] = useState(0);
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

  const getPaginatedAvatars = (page) => {
    const start = 10 * page;
    const end = 10 * page + 10;
    return avatars.slice(start, end);
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
              {getPaginatedAvatars(page).map((avatar) => {
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
            <PaginationContainer>
              <StyledButton
                type="button"
                border="1px solid yellow"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                {t("prev")}
              </StyledButton>
              <StyledButton
                type="button"
                border="1px solid green"
                color="white"
                disabled={page === 3}
                onClick={() => setPage(page + 1)}
              >
                {t("next")}
              </StyledButton>
            </PaginationContainer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default AvatarList;
