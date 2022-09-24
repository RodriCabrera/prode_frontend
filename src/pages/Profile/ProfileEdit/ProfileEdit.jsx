import { useContext } from 'react';
import { Spinner } from '../../../common/Spinner/Spinner';
import { UserNameContainer, BigAvatarWrapper } from '../Profile';
import { UserMiniAvatar } from '../../../common/UserMiniAvatar/UserMiniAvatar';
import { ProfileEditForm } from './ProfileEditForm';
import {
  CardContainer,
  CardWrapper,
  Text,
} from '../../../common/common.styles';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { AuthContext } from '../../../common/AuthProvider';

function ProfileEdit() {
  const userContext = useContext(AuthContext);
  const isMobile = useIsMobile();

  return (
    <CardContainer>
      <CardWrapper border={isMobile ? 'none' : null}>
        {userContext.isLoading ? (
          <Spinner />
        ) : (
          <>
            <UserNameContainer>
              <Text size="1.5rem" weight="bold">
                {userContext.user?.name}
              </Text>
              <Text size="1rem" weight="300">
                {userContext.user?.email}
              </Text>
              <UserMiniAvatar
                name={userContext.user?.name}
                avatar={userContext.user?.avatar}
                emptySize="10rem"
              />
            </UserNameContainer>
            <ProfileEditForm
              profile={userContext.user}
              updateProfile={() => userContext?.updateAuth()}
            />
          </>
        )}
      </CardWrapper>
    </CardContainer>
  );
}

export default ProfileEdit;
