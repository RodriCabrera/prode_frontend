import React, { useEffect, useState } from "react";
import { FcEditImage } from "react-icons/fc";

import { getAvatars } from "../../../api/profiles";
import { Spinner } from "common/Spinner/Spinner";
import { UserMiniAvatar } from "common/UserMiniAvatar/UserMiniAvatar";
import Modal from "common/Modal/Modal";
import useCleanupController from "hooks/useCleanupController";
import useToggleModal from "hooks/useToggleModal";

import {
  Container,
  AvatarWrapper,
  Avatar,
  BigAvatarWrapper,
} from "../profile.styles";
import { Button, Input, Text } from "common/common.styles";

function AvatarList({ handleAvatarClick, selectedAvatar }) {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAvatarList, setShowAvatarList] = useState(false);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { showModal, toggleModal } = useToggleModal();
  const [customAvatarLink, setCustomAvatarLink] = useState("");

  useEffect(() => {
    if (showAvatarList) {
      setIsLoading(true);
      getAvatars(signal)
        .then((res) => setAvatars(res.data))
        .catch((err) => handleCancel(err))
        .finally(() => setIsLoading(false));
    }
    return cleanup;
  }, [showAvatarList]);

  const handleCustomAvatar = () => {
    if (customAvatarLink) handleAvatarClick(customAvatarLink);
    toggleModal();
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button
            grayscale={showAvatarList}
            padding="10px"
            weight="400"
            onClick={() => setShowAvatarList(!showAvatarList)}
            style={{ width: "100%" }}
          >
            {showAvatarList ? "Ocultar" : "Mostrar"} lista de avatares
          </Button>
          {showAvatarList && (
            <>
              <AvatarWrapper
                selected={selectedAvatar && !avatars.includes(selectedAvatar)}
                onClick={toggleModal}
              >
                <FcEditImage
                  size={60}
                  style={{
                    filter:
                      selectedAvatar && !avatars.includes(selectedAvatar)
                        ? "none"
                        : "grayscale(100%)",
                  }}
                />
              </AvatarWrapper>
              {avatars.map((avatar) => {
                return (
                  <AvatarWrapper
                    selected={avatar === selectedAvatar}
                    key={avatar}
                    onClick={() => handleAvatarClick(avatar)}
                  >
                    <Avatar
                      src={avatar}
                      alt="avatar"
                      selected={avatar === selectedAvatar}
                    />
                  </AvatarWrapper>
                );
              })}
            </>
          )}
          <Modal show={showModal} toggle={toggleModal}>
            <Text size="2rem" align="center">
              Introduce un link a tu imagen
            </Text>
            <Input
              type="url"
              value={customAvatarLink}
              onChange={(e) => setCustomAvatarLink(e.target.value)}
            />
            <BigAvatarWrapper>
              <UserMiniAvatar avatar={customAvatarLink} />
            </BigAvatarWrapper>
            <Button type="button" onClick={handleCustomAvatar}>
              Enviar
            </Button>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default AvatarList;
