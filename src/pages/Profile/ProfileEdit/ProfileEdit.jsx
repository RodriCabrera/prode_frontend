import { useContext } from "react";

import { Spinner } from "../../../common/Spinner/Spinner";
import { BigAvatarWrapper, UserNameContainer } from "../Profile";
import { UserMiniAvatar } from "../../../common/UserMiniAvatar/UserMiniAvatar";
import { ProfileEditForm } from "./ProfileEditForm";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { AuthContext } from "../../../common/AuthProvider";

import {
  CardContainer,
  CardWrapper,
  Text,
} from "../../../common/common.styles";

function ProfileEdit() {
  const userContext = useContext(AuthContext);
  const isMobile = useIsMobile();

  return (
    <CardContainer>
      <CardWrapper border={isMobile ? "none" : null}>
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
              <BigAvatarWrapper>
                <UserMiniAvatar
                  name={userContext.user?.name}
                  avatar={userContext.user?.avatar}
                  emptySize="10rem"
                />
              </BigAvatarWrapper>
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
