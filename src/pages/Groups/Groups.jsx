import React, { useContext } from 'react';
import { AuthContext } from '../../common/AuthProvider';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import CreateGroupForm from './components/CreateGroupForm';
import JoinGroupForm from './components/JoinGroupForm';
// TODO: Darle algo de estilos a esto.
// TODO: Revisar en los componentes que al mandar el request se borre la data y los msjs de error
// TODO: Refrescar los datos de usuario al sumarse a un grupo

function Groups() {
  const userContext = useContext(AuthContext);
  console.log(userContext.user);

  return (
    <>
      <Text size="1.2rem">
        Grupos en los que estás participando:{' '}
        {userContext.user.groups.map((group) => `🟠 ${group}`)}
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
