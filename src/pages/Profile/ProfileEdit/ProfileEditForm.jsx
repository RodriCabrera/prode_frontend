import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editProfile } from '../../../api/profiles';
import { Button, Form, Input, Label } from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';

function ProfileEditForm({
  profile,
  selectedAvatar,
  isEditingEnabled,
  setIsEditingEnabled,
}) {
  const [userName, setuserName] = useState(profile.name);
  const [isLoading, setIsLoading] = useState(false);
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
      });
  };
  if (isLoading) return <Spinner />;
  return (
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
  );
}

export default ProfileEditForm;
