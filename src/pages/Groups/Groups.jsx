import React, { useContext } from 'react';
import { AuthContext } from '../../common/AuthProvider';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import CreateGroupForm from './components/CreateGroupForm';
import JoinGroupForm from './components/JoinGroupForm';
// TODO: Darle algo de estilos a esto.

function Groups() {
  const userContext = useContext(AuthContext);
  console.log(userContext.user);

  return (
    <>
      <Text size="1.2rem">Grupos en los que estás participando:</Text>
      {userContext.user.groups.map((group) => (
        <Text>🟠 {group}</Text>
      ))}
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
