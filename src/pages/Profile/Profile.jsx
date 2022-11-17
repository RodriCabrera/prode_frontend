import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useTranslation } from "react-i18next";

import { getProfile } from "api/profiles";
import { GoBackButton } from "common/GoBackButton/GoBackButton";
import { ListElement } from "common/Lists/ListElement";
import { Spinner } from "common/Spinner/Spinner";
import { useIsMobile } from "hooks/useIsMobile";
import { UserMiniAvatar } from "common/UserMiniAvatar/UserMiniAvatar";
import ProfilePredictions from "./ProfilePredictions";
import useCleanupController from "hooks/useCleanupController";

import { ListWrapper } from "common/Lists/Lists.styles";
import { CardContainer, CardWrapper, Text } from "common/common.styles";
import { BigAvatarWrapper, UserNameContainer } from "./profile.styles";

function Profile() {
  const { name } = useParams();
  const [profile, setProfile] = useState({});
  const [sharedGroups, setSharedGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupPredictions, setGroupPredictions] = useState({});
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    getProfile(name, signal)
      .then(({ data }) => {
        setProfile(data.profile);
        setSharedGroups(data.sharedGroups || []);
      })
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);

  const handleSwitchPredictions = (group) => {
    if (groupPredictions.group?._id === group._id)
      return setGroupPredictions({});
    return setGroupPredictions({ user: profile, group });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <CardContainer>
      <CardWrapper border={isMobile ? "none" : null}>
        <GoBackButton collapse={isMobile} />
        <UserNameContainer>
          <Text size="1.5rem" weight="bold">
            {profile?.name}
          </Text>
          <BigAvatarWrapper>
            <UserMiniAvatar name={profile?.name} avatar={profile?.avatar} />
          </BigAvatarWrapper>
        </UserNameContainer>
        {sharedGroups.length > 0 ? (
          <>
            <Text margin="1.2rem 0 0 0">{t("predictions")}:</Text>
            <ListWrapper>
              {sharedGroups.map((group) => (
                <ListElement
                  key={group._id}
                  onClick={() => handleSwitchPredictions(group)}
                  bgColor={
                    groupPredictions.group?._id === group._id ? "salmon" : null
                  }
                  avatar={
                    groupPredictions?.group?._id === group._id ? (
                      <MdOutlineVisibilityOff size={26} />
                    ) : (
                      <HiOutlineUserGroup size="1.8rem" />
                    )
                  }
                >
                  <Text>{group.name}</Text>
                </ListElement>
              ))}
            </ListWrapper>
            {groupPredictions.group && (
              <ProfilePredictions props={groupPredictions} />
            )}
          </>
        ) : (
          <Text align="center">{t("noSharedGroups")}</Text>
        )}
      </CardWrapper>
    </CardContainer>
  );
}

export default Profile;
