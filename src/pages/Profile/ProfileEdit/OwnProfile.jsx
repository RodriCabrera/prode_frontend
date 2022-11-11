import React, { useContext, useState } from "react";

import { Spinner } from "../../../common/Spinner/Spinner";
import { UserMiniAvatar } from "../../../common/UserMiniAvatar/UserMiniAvatar";
import ProfileEdit from "./ProfileEditNew";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { AuthContext } from "../../../common/AuthProvider";

import {
  Button,
  CardContainer,
  CardWrapper,
  Text,
} from "../../../common/common.styles";
import { BigAvatarWrapper, UserNameContainer } from "../profile.styles";
import { useTranslation } from "react-i18next";

export default function OwnProfile() {
  const [editMode, setEditMode] = useState(false);

  const userContext = useContext(AuthContext);

  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const toggleEditMode = () => {
    setEditMode((edit) => !edit);
  };

  return (
    <CardContainer>
      <CardWrapper border={isMobile ? "none" : null}>
        {userContext.isLoading ? (
          <Spinner />
        ) : editMode ? (
          <ProfileEdit toggleEditMode={toggleEditMode} isMobile={isMobile} />
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
            <Button onClick={toggleEditMode}>{t("editProfile")}</Button>
          </>
        )}
      </CardWrapper>
    </CardContainer>
  );
}
