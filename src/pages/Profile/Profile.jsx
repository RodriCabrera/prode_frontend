import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { MdOutlineVisibilityOff } from 'react-icons/md';
import { HiOutlineUserGroup } from 'react-icons/hi';
import ProfilePredictions from './ProfilePredictions';
import { getProfile } from '../../api/profiles';
import { Spinner } from '../../common/Spinner/Spinner';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import { ListWrapper } from '../../common/Lists/Lists.styles';
import { ListElement } from '../../common/Lists/ListElement';
import { UserMiniAvatar } from '../../common/UserMiniAvatar/UserMiniAvatar';
import { GoBackButton } from '../../common/GoBackButton/GoBackButton';
import { useIsMobile } from '../../hooks/useIsMobile';
import useCleanupController from '../../hooks/useCleanupController';

function Profile() {
  const { name } = useParams();
  const [profile, setProfile] = useState({});
  const [sharedGroups, setSharedGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupPredictions, setGroupPredictions] = useState({});
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();

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
      <CardWrapper border={isMobile ? 'none' : null}>
        <GoBackButton collapse={isMobile}/>
        <UserNameContainer>
          <Text size="1.5rem" weight="bold">
            {profile?.name}
          </Text>
          <UserMiniAvatar name={profile?.name} avatar={profile?.avatar} />
        </UserNameContainer>
        <Text margin="1.2rem 0 0 0">Predicciones de {profile.name}:</Text>
        <ListWrapper>
          {sharedGroups.map((group) => (
            <ListElement
              key={group._id}
              onClick={() => handleSwitchPredictions(group)}
              bgColor={
                groupPredictions.group?._id === group._id ? 'salmon' : null
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
        {sharedGroups.length === 0 && (
          <Text align="center">No compartes ningún grupo con este usuario</Text>
        )}
      </CardWrapper>
    </CardContainer>
  );
}

export const UserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export default Profile;
