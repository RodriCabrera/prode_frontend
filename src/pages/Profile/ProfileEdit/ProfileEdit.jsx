import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  CardContainer,
  CardWrapper,
  Text,
} from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import { getProfile } from '../../../api/profiles';
import AvatarList from './AvatarList';
import UserMiniAvatar from '../../../common/UserMiniAvatar/UserMiniAvatar';
import ProfileEditForm from './ProfileEditForm';

// TODO: ver nombre, avatar, y poder editarlos.
function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [avatar, setAvatar] = useState(undefined);

  useEffect(() => {
    setIsLoading(true);
    getProfile()
      .then((res) => setProfile(res.data.profile))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAvatarClick = (selectedAvatar) => {
    setAvatar(selectedAvatar);
  };

  const renderCardContent = () => (
    <>
      <UserNameContainer>
        <Text size="1.5rem" weight="bold">
          {profile.name}
        </Text>
        <UserMiniAvatar name={profile.name} avatar={profile.avatar} />
      </UserNameContainer>
      <ProfileEditForm
        profile={profile}
        isEditingEnabled={isEditingEnabled}
        selectedAvatar={avatar}
        setIsEditingEnabled={setIsEditingEnabled}
      />
      {!isEditingEnabled && (
        <Button onClick={() => setIsEditingEnabled(!isEditingEnabled)}>
          Editar Perfil
        </Button>
      )}
      {isEditingEnabled && <AvatarList handleAvatarClick={handleAvatarClick} />}
    </>
  );

  return (
    <CardContainer>
      <CardWrapper>{isLoading ? <Spinner /> : renderCardContent()}</CardWrapper>
    </CardContainer>
  );
}
const UserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
export default ProfileEdit;
