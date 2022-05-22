import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HiOutlineUserGroup, HiCheck } from 'react-icons/hi';
import { getUserGroups } from '../../api/groups';
import { Text } from '../../common/common.styles';
import ListElement from '../../common/Lists/ListElement';
import { Spinner } from '../../common/Spinner/Spinner';
import { ListWrapper } from '../../common/Lists/Lists.styles';

const GroupsListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function EditPredictions() {
  const [groupList, setGroupList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGroup, setselectedGroup] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUserGroups()
      .then(({ data }) => {
        setGroupList(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleGroupSelect = (group) => {
    setselectedGroup(group);
  };

  console.log(selectedGroup);
  return (
    <>
      <Text size="1.4rem">Para qué grupo son estas predicciones?</Text>
      <GroupsListWrapper>
        {isLoading && <Spinner />}

        <ListWrapper>
          {groupList?.map((group) => {
            const isSelected = selectedGroup?.id === group.id;
            return (
              <ListElement
                avatar={
                  isSelected ? (
                    <HiCheck size="1.8rem" />
                  ) : (
                    <HiOutlineUserGroup size="1.8rem" />
                  )
                }
                bgColor={isSelected && 'green'}
                onClick={() => handleGroupSelect(group)}
              >
                <Text weight="600">{group.name.toUpperCase()}</Text>
              </ListElement>
            );
          })}
        </ListWrapper>
      </GroupsListWrapper>
      {!isLoading && selectedGroup?.id && <Outlet context={[selectedGroup]} />}
    </>
  );
}

export default EditPredictions;
