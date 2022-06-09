import React, { useState } from 'react';
import UserMiniAvatar from '../../common/UserMiniAvatar/UserMiniAvatar';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import ListElement from '../../common/Lists/ListElement';
import GroupScoresForm from './GroupScoresForm';

function Scores() {
  const [scores, setScores] = useState(undefined);

  const onMemberClick = (member) => {
    console.log(member);
  };

  return (
    <CardContainer>
      <CardWrapper>
        <Text size="2rem" align="center">
          Ver puntajes
        </Text>
        <GroupScoresForm setScores={setScores} />
        {scores?.data.scores.map((score) => {
          return (
            <ListElement
              key={score.group}
              onClick={() => onMemberClick(score.user)}
              avatar={
                <UserMiniAvatar avatar={score.avatar} name={score.user} />
              }
            >
              <p>{`${score.user} : ${score.score}`}</p>
            </ListElement>
          );
        })}
      </CardWrapper>
    </CardContainer>
  );
}

export default Scores;
