import React, { useContext } from 'react';
import { AuthContext } from '../../common/AuthProvider';
import { CardWrapper, Text } from '../../common/common.styles';
import GroupScoresForm from './GroupScoresForm';

function Scores() {
  const userContext = useContext(AuthContext);
  console.log(userContext);

  return (
    <CardWrapper>
      <Text size="2rem" align="center">
        Ver puntajes
      </Text>
      <GroupScoresForm />
    </CardWrapper>
  );
}

export default Scores;
