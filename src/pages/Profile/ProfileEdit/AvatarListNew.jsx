import React, { useEffect, useState } from "react";

import { getAvatars } from "api/profiles";
import { Spinner } from "common/Spinner/Spinner";
import useCleanupController from "hooks/useCleanupController";
import useToggleModal from "../../../hooks/useToggleModal";

import Modal from "../../../common/Modal/Modal";
import { Container, AvatarWrapper, Avatar } from "../profile.styles";
import { Button } from "common/common.styles";

function AvatarList({ handleNewAvatar }) {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { showModal, toggleModal } = useToggleModal()

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
  }
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
            O elige de la lista
          </Button>
        <Modal show={showModal} toggle={toggleModal}>
            <Container>
                {avatars.map((avatar) => {
                return (
                    <AvatarWrapper
                        key={avatar}
                        onClick={() => handleAvatarClick(avatar)}
                    >
                    <Avatar
                        src={avatar}
                        alt="avatar"
                    />
                    </AvatarWrapper>
                );
                })}
            </Container>
        </Modal>
        </>
      )}
    </Container>
  );
}

export default AvatarList;