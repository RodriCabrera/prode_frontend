import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import styled from '@emotion/styled';
import ProfilePredictions from './ProfilePredictions';
import { getProfile } from '../../api/profiles';
import { Spinner } from '../../common/Spinner/Spinner';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import { ListWrapper } from '../../common/Lists/Lists.styles';
import ListElement from '../../common/Lists/ListElement';
import UserMiniAvatar from '../../common/UserMiniAvatar/UserMiniAvatar';

function Profile() {
  const { name } = useParams();
  const [profile, setProfile] = useState({});
  const [sharedGroups, setSharedGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupPredictions, setGroupPredictions] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getProfile(name)
      .then(({ data }) => {
        setProfile(data.profile);
        setSharedGroups(data.sharedGroups || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSwitchPredictions = (group) => {
    if (groupPredictions.group?._id === group._id)
      return setGroupPredictions({});
    return setGroupPredictions({ user: profile, group });
  };

  return (
    <>
      {isLoading && <Spinner />}
      <CardContainer>
        <CardWrapper fullWidth>
          <UserNameContainer>
            <Text size="1.5rem" weight="bold">
              {profile?.name}
            </Text>
            <UserMiniAvatar name={profile?.name} avatar={profile?.avatar} />
          </UserNameContainer>
          {sharedGroups.length > 0 ? (
            <>
              <Text>Predicciones de {profile.name}:</Text>
              <ListWrapper>
                {sharedGroups.map((group) => (
                  <ListElement
                    key={group._id}
                    onClick={() => handleSwitchPredictions(group)}
                    bgColor={
                      groupPredictions.group?._id === group._id
                        ? 'salmon'
                        : null
                    }
                    avatar={
                      groupPredictions?.group?._id === group._id ? (
                        <span className="material-symbols-outlined">
                          visibility_off
                        </span>
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
            <Text align="center">
              No compartes ningún grupo con este usuario
            </Text>
          )}
        </CardWrapper>
      </CardContainer>
    </>
  );
}

export const UserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export default Profile;
