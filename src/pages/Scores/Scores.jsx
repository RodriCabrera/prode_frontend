import React, { useState } from 'react';
import { CardWrapper, Text } from '../../common/common.styles';
import GroupScoresForm from './GroupScoresForm';

function Scores() {
  const [scores, setScores] = useState(undefined);
  console.log('scores', scores);
  return (
    <CardWrapper>
      <Text size="2rem" align="center">
        Ver puntajes
      </Text>
      <GroupScoresForm setScores={setScores} />
      {scores?.data.scores.map((score) => (
        <p key={score.user}>{`${score.user} : ${score.score}`}</p>
      ))}
    </CardWrapper>
  );
}

export default Scores;
