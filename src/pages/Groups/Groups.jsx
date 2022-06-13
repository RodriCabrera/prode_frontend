import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import CreateGroupForm from './components/CreateGroupForm';
import JoinGroupForm from './components/JoinGroupForm';
import GroupList from './components/GroupList';
import { getUserGroups } from '../../api/groups';
import { Spinner } from '../../common/Spinner/Spinner';

function Groups() {
  const [groupList, setGroupList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGroupList = () => {
    setIsLoading(true);
    getUserGroups()
      .then(({ data }) => {
        setGroupList(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <>
      <CardContainer>
        <CardWrapper>
          {!isEmpty(groupList) && (
            <Text size="1.5rem">Grupos en los que estás participando: </Text>
          )}
          {isLoading ? <Spinner /> : <GroupList groups={groupList} />}
        </CardWrapper>
      </CardContainer>

      <CardContainer>
        <CardWrapper>
          <CreateGroupForm updateList={getGroupList} />
        </CardWrapper>
      </CardContainer>

      <CardContainer>
        <CardWrapper>
          <JoinGroupForm updateList={getGroupList} />
        </CardWrapper>
      </CardContainer>
    </>
  );
}

export default Groups;
