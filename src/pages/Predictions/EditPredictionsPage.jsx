import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HiOutlineUserGroup, HiCheck } from 'react-icons/hi';
import { getUserGroups } from '../../api/groups';
import { Text } from '../../common/common.styles';
import { ListElement } from '../../common/Lists/ListElement';
import { Spinner } from '../../common/Spinner/Spinner';
import { ListWrapper } from '../../common/Lists/Lists.styles';
import useCleanupController from '../../hooks/useCleanupController';

const GroupsListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// ! ESTE COMPONENTE NO SE ESTA USANDO

function EditPredictions() {
  const [userGroupList, setUserGroupList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserGroup, setSelectedUserGroup] = useState(null);
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    setIsLoading(true);
    getUserGroups(signal)
      .then(({ data }) => {
        setUserGroupList(data);
      })
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, [selectedUserGroup]);

  const handleGroupSelect = (group) => {
    setSelectedUserGroup(group);
  };

  return (
    <>
      <Text size="1.4rem">Para qué grupo son estas predicciones?</Text>
      <GroupsListWrapper>
        {isLoading && <Spinner />}

        <ListWrapper>
          {userGroupList?.map((userGroup) => {
            const isSelected = selectedUserGroup?.id === userGroup.id;
            return (
              <ListElement
                key={userGroup.id}
                avatar={
                  isSelected ? (
                    <HiCheck size="1.8rem" />
                  ) : (
                    <HiOutlineUserGroup size="1.8rem" />
                  )
                }
                bgColor={isSelected && 'green'}
                onClick={() => handleGroupSelect(userGroup)}>
                <Text weight="600">{userGroup.name.toUpperCase()}</Text>
              </ListElement>
            );
          })}
        </ListWrapper>
      </GroupsListWrapper>
      {!isLoading && selectedUserGroup?.id && (
        <Outlet context={[selectedUserGroup]} />
      )}
    </>
  );
}

export default EditPredictions;
