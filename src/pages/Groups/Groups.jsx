import React, { useEffect, useState } from 'react';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import CreateGroupForm from './components/CreateGroupForm';
import JoinGroupForm from './components/JoinGroupForm';
import GroupList from './components/GroupList';
import { getUserGroups } from '../../api/groups';
import { Spinner } from '../../common/Spinner/Spinner';
// TODO: Darle algo de estilos a esto.
// TODO: Revisar en los componentes que al mandar el request se borre la data y los msjs de error

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
          <Text size="1.5rem" align="center">
            Grupos en los que estás participando:{' '}
          </Text>
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
