import React, { useContext } from 'react';
import { AuthContext } from '../../common/AuthProvider';
import { Text } from '../../common/common.styles';
import CreateGroupForm from './components/CreateGroupForm';
import GroupScores from './components/GroupScores';
import JoinGroupForm from './components/JoinGroupForm';
// TODO: Darle algo de estilos a esto.

function Groups() {
  const userContext = useContext(AuthContext);
  console.log(userContext.user);

  return (
    <>
      <Text size="1.2rem">
        Grupos en los que estás participando:{' '}
        {userContext.user.groups.map((group) => group)}
      </Text>
      <CreateGroupForm />
      <JoinGroupForm />
      <GroupScores />
    </>
  );
}

export default Groups;
