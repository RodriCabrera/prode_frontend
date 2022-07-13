/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { GiPodiumWinner } from 'react-icons/gi';
import { getGroupScores } from '../../../api/groups';
import { ListElement } from '../../../common/Lists/ListElement';
import { UserMiniAvatar } from '../../../common/UserMiniAvatar/UserMiniAvatar';

function Leader({ groupName, isUnique }) {
  const [leaders, setLeaders] = useState(isUnique ? [{}, {}, {}] : [{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getGroupScores(groupName)
      .then((res) => {
        const groupLeaders = res.data.scores;
        setLeaders(isUnique ? groupLeaders.slice(0, 3) : [groupLeaders[0]]);
      })
      .finally(() => setIsLoading(false));
  }, [groupName, isUnique]);

  return (
    <div>
      <h1>{groupName}</h1>
      {leaders.map((leader, index) =>
        isLoading ? (
          <ListElement
            key={`${groupName}-${index}-placeholder`}
            avatar={<GiPodiumWinner size="1.5rem" />}
          >
            <p>. . .</p>
          </ListElement>
        ) : (
          <ListElement
            key={leader.user}
            avatar={
              <UserMiniAvatar avatar={leader.avatar} name={leader.user} />
            }
          >
            <p>{leader.user}</p>
          </ListElement>
        )
      )}
    </div>
  );
}

export default Leader;
