import { useEffect, useState } from 'react';
import { Spinner } from '../../../common/Spinner/Spinner';
import { getProfile } from '../../../api/profiles';
import { UserNameContainer } from '../Profile';
import { UserMiniAvatar } from '../../../common/UserMiniAvatar/UserMiniAvatar';
import { ProfileEditForm } from './ProfileEditForm';
import {
  CardContainer,
  CardWrapper,
  Text,
} from '../../../common/common.styles';

function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});

  const updateProfile = () => {
    getProfile()
      .then((res) => setProfile(res.data.profile))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    updateProfile();
  }, []);

  const renderCardContent = () => (
    <>
      <UserNameContainer>
        <Text size="1.5rem" weight="bold">
          {profile.name}
        </Text>
        <UserMiniAvatar name={profile.name} avatar={profile.avatar} />
      </UserNameContainer>
      <ProfileEditForm profile={profile} updateProfile={updateProfile} />
    </>
  );

  return (
    <CardContainer>
      <CardWrapper>{isLoading ? <Spinner /> : renderCardContent()}</CardWrapper>
    </CardContainer>
  );
}

export default ProfileEdit;
