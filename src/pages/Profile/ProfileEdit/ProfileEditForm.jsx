import { useState } from 'react';
import { editProfile } from '../../../api/profiles';
import Modal from '../../../common/Modal/Modal';
import useToggleModal from '../../../hooks/useToggleModal';
import { UserMiniAvatar } from '../../../common/UserMiniAvatar/UserMiniAvatar';
import {
  Button,
  Form,
  Input,
  Label,
  Text,
} from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import AvatarList from './AvatarList';

export function ProfileEditForm({ profile, updateProfile }) {
  const [userName, setuserName] = useState(profile.name);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  // const [showModal, setShowModal] = useState(false);
  const { showModal, toggleModal } = useToggleModal();
  const handleNameChange = (e) => {
    setuserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editProfile({
      name: userName || profile.name,
      avatar: selectedAvatar || profile.avatar,
    })
      .then(() => {
        updateProfile();
      })
      .catch((err) => alert(err))
      .finally(() => {
        setIsLoading(false);
        setIsEditingEnabled(false);
      });
  };

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      {!isEditingEnabled && (
        <Button onClick={() => setIsEditingEnabled(!isEditingEnabled)}>
          Editar Perfil
        </Button>
      )}
      {isEditingEnabled && (
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">
            <Input
              type="string"
              placeholder="Nombre de usuario"
              name="name"
              disabled={!isEditingEnabled}
              value={userName}
              onChange={handleNameChange}
            />
          </Label>
          <Button
            type="button"
            onClick={toggleModal}
            disabled={
              userName === profile.name && selectedAvatar === profile.avatar
            }
          >
            Actualizar Perfil
          </Button>
          <Modal show={showModal} toggle={toggleModal}>
            <Text size="1.2rem" align="center" withBottomBorder>
              Tu nuevo perfil
            </Text>
            <br />
            <Text size="2rem" align="center">
              {userName || profile.name}
            </Text>
            <br />
            <UserMiniAvatar
              avatar={selectedAvatar || profile.avatar}
              name={userName || profile.name}
            />
            <br />
            <Button type="submit">Confirmar</Button>
          </Modal>
        </Form>
      )}
      {isEditingEnabled && (
        <AvatarList
          handleAvatarClick={handleAvatarClick}
          selectedAvatar={selectedAvatar}
        />
      )}
    </>
  );
}
