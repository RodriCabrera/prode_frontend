import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { getAvatars } from '../../../api/profiles';
import { Button, Input, Text } from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import { FcEditImage } from 'react-icons/fc';
import useCleanupController from '../../../hooks/useCleanupController';
import Modal from '../../../common/Modal/Modal';
import useToggleModal from '../../../hooks/useToggleModal';
import { BigAvatarWrapper } from '../Profile';
import { UserMiniAvatar } from '../../../common/UserMiniAvatar/UserMiniAvatar';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 40px;
`;

const AvatarWrapper = styled.div`
  border-radius: 100%;
  cursor: pointer;
  overflow: hidden;
  min-height: 70px;
  min-width: 70px;
  border: ${({ selected }) =>
    selected ? '2px inset tomato' : '2px inset rgba(0, 0, 0, 0)'};
  background-color: darkgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 70px;
  filter: grayscale(${({ selected }) => (selected ? '30%' : '100%')});
`;

function AvatarList({ handleAvatarClick, selectedAvatar }) {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAvatarList, setShowAvatarList] = useState(false);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { showModal, toggleModal } = useToggleModal();
  const [customAvatarLink, setCustomAvatarLink] = useState('')

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
    if(customAvatarLink) handleAvatarClick(customAvatarLink);
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
            style={{ width: '100%' }}
          >
            {showAvatarList ? 'Ocultar' : 'Mostrar'} lista de avatares
          </Button>
          {showAvatarList && (
            <>
              <AvatarWrapper
                selected={selectedAvatar && !avatars.includes(selectedAvatar)}
                onClick={toggleModal}
              >
                <FcEditImage size={60} style={{filter: selectedAvatar && !avatars.includes(selectedAvatar) ? 'none' : 'grayscale(100%)' }} />
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
          <Modal show={showModal}  toggle={toggleModal}>
              <Text size="2rem" align="center">Introduce un link a tu imagen</Text>
              <Input type="url" value={customAvatarLink} onChange={(e) => setCustomAvatarLink(e.target.value)} />
              <BigAvatarWrapper>
                <UserMiniAvatar avatar={customAvatarLink} />
              </BigAvatarWrapper>
              <Button type="button" onClick={handleCustomAvatar}>Enviar</Button>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default AvatarList;
