import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import CreateGroupForm from './components/CreateGroupForm';
import JoinGroupForm from './components/JoinGroupForm';
import GroupList from './components/GroupList';
import { getUserGroups } from '../../api/groups';
import { Spinner } from '../../common/Spinner/Spinner';
import LeaveGroupForm from './components/LeaveGroupForm';

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
        <CardWrapper fullWidth>
          {!isEmpty(groupList) && (
            <Text size="1.5rem" align="center">
              Grupos en los que estás participando:{' '}
            </Text>
          )}
          {isLoading ? <Spinner /> : <GroupList groups={groupList} />}
        </CardWrapper>
      </CardContainer>

      <CardContainer>
        <CardWrapper>
          <CreateGroupForm updateList={getGroupList} />
        </CardWrapper>

        <CardWrapper>
          <JoinGroupForm updateList={getGroupList} />
        </CardWrapper>

        <CardWrapper>
          <LeaveGroupForm updateList={getGroupList} />
        </CardWrapper>
      </CardContainer>
    </>
  );
}

export default Groups;
