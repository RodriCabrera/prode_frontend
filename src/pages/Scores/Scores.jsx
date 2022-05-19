import React, { useState } from 'react';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { CardWrapper, Text } from '../../common/common.styles';
import ListElement from '../../common/Lists/ListElement';
import GroupScoresForm from './GroupScoresForm';

function Scores() {
  const [scores, setScores] = useState(undefined);
  console.log('scores', scores);

  const onMemberClick = (member) => {
    console.log(member);
  };

  return (
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
            avatar={<HiOutlineUserGroup size="1.8rem" />}
          >
            <p>{`${score.user} : ${score.score}`}</p>
          </ListElement>
        );
      })}
    </CardWrapper>
  );
}

export default Scores;
