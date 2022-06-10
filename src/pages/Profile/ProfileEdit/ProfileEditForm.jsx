import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editProfile } from '../../../api/profiles';
import { Button, Form, Input, Label } from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import AvatarList from './AvatarList';

function ProfileEditForm({ profile, updateProfile }) {
  const [userName, setuserName] = useState(profile.name);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const navigate = useNavigate();
  const handleNameChange = (e) => {
    setuserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editProfile({ name: userName, avatar: selectedAvatar })
      .then(() => navigate('/profile'))
      .catch((err) => alert(err))
      .finally(() => {
        setIsLoading(false);
        setIsEditingEnabled(false);
        updateProfile();
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
        {isEditingEnabled && <Button type="submit">Actualizar Perfil</Button>}
      </Form>
      {isEditingEnabled && (
        <AvatarList
          handleAvatarClick={handleAvatarClick}
          selectedAvatar={selectedAvatar}
        />
      )}
    </>
  );
}

export default ProfileEditForm;
