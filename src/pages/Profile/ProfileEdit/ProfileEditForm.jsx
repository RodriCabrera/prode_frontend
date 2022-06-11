import { useState } from 'react';
import { editProfile } from '../../../api/profiles';
import { Button, Form, Input, Label } from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import AvatarList from './AvatarList';

export function ProfileEditForm({ profile, updateProfile }) {
  const [userName, setuserName] = useState(profile.name);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
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
      .then((res) => {
        console.log(res);
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
          <Button type="submit">Actualizar Perfil</Button>
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
