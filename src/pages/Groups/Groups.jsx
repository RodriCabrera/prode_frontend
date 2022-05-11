import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../common/AuthProvider';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import CreateGroupForm from './components/CreateGroupForm';
import JoinGroupForm from './components/JoinGroupForm';
// TODO: Darle algo de estilos a esto.
// TODO: Revisar en los componentes que al mandar el request se borre la data y los msjs de error
// TODO: Refrescar los datos de usuario al sumarse a un grupo

function Groups() {
  const userContext = useContext(AuthContext);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    if (userContext.user) {
      setGroupList(userContext.user.groups);
    }
  }, [userContext.user]);

  console.log('userContext', userContext.user);

  return (
    <>
      <Text size="1.2rem">
        Grupos en los que estás participando:{' '}
        {groupList.map((group) => `🟠 ${group}`)}
      </Text>

      <CardContainer>
        <CardWrapper>
          <CreateGroupForm />
        </CardWrapper>
        <CardWrapper>
          <JoinGroupForm />
        </CardWrapper>
      </CardContainer>
    </>
  );
}

export default Groups;
