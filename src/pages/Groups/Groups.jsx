import React, { useEffect, useState } from 'react';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import CreateGroupForm from './components/CreateGroupForm';
import JoinGroupForm from './components/JoinGroupForm';
import { getUserGroups } from '../../api/groups';
// TODO: Darle algo de estilos a esto.
// TODO: Revisar en los componentes que al mandar el request se borre la data y los msjs de error

function Groups() {
  const [groupList, setGroupList] = useState([]);

  const getGroupList = () => {
    getUserGroups()
      .then(({ data }) => {
        setGroupList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <>
      <Text size="1.2rem">Grupos en los que estás participando: </Text>
      <ul>
        {groupList.length > 0 &&
          groupList.map((group) => <li> {group.name}</li>)}
      </ul>

      <CardContainer>
        <CardWrapper>
          <CreateGroupForm updateList={getGroupList} />
        </CardWrapper>
        <CardWrapper>
          <JoinGroupForm updateList={getGroupList} />
        </CardWrapper>
      </CardContainer>
    </>
  );
}

export default Groups;
