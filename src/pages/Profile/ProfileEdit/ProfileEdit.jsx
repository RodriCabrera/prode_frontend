import { useContext } from 'react';
import { Spinner } from '../../../common/Spinner/Spinner';
import { UserNameContainer } from '../Profile';
import { UserMiniAvatar } from '../../../common/UserMiniAvatar/UserMiniAvatar';
import { ProfileEditForm } from './ProfileEditForm';
import {
  CardContainer,
  CardWrapper,
  Text,
} from '../../../common/common.styles';
import { AuthContext } from '../../../common/AuthProvider';

function ProfileEdit() {
  const userContext = useContext(AuthContext);

  return (
    <CardContainer>
      <CardWrapper>
        {userContext.isLoading ? (
          <Spinner />
        ) : (
          <>
            <UserNameContainer>
              <Text size="1.5rem" weight="bold">
                {userContext.user.name}
              </Text>
              <Text size="1rem" weight="300">
                {userContext.user.email}
              </Text>
              <UserMiniAvatar
                name={userContext.user.name}
                avatar={userContext.user.avatar}
              />
            </UserNameContainer>
            <ProfileEditForm
              profile={userContext.user}
              updateProfile={() => userContext?.checkAuth()}
            />
          </>
        )}
      </CardWrapper>
    </CardContainer>
  );
}

export default ProfileEdit;
