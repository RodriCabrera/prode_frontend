import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getUserGroups } from '../../api/groups';
import { Text } from '../../common/common.styles';
import ListElement from '../../common/Lists/ListElement';
import { Spinner } from '../../common/Spinner/Spinner';

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

  const handleGroupSelect = (groupId) => {
    console.log(groupId);
  };

  console.log('groupList', groupList);
  return (
    <>
      <Text>Para que grupo son estas predicciones??</Text>
      <GroupsListWrapper>
        {isLoading ? (
          <Spinner />
        ) : (
          groupList?.map((group) => {
            return (
              <ListElement onClick={() => handleGroupSelect(group.id)}>
                {group.name}
              </ListElement>
            );
          })
        )}
      </GroupsListWrapper>
      <Outlet context={[selectedGroup]} />
    </>
  );
}

export default EditPredictions;
