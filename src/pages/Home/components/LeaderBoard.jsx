import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import Leader from './Leader';
import { getUserGroups } from '../../../api/groups';

const LeaderBoardWrapper = styled.div`
  width: 100%;
`;

function LeaderBoard() {
  const [userGroups, setUserGroups] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUserGroups()
      .then((res) => {
        setUserGroups(res?.data?.slice(0, 5));
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <LeaderBoardWrapper id="leaderboard-wrapper">
      {isLoading || !userGroups ? (
        <div>Loading leaderboard...</div>
      ) : (
        userGroups.map((group) => (
          <Leader
            key={group.name}
            groupName={group.name}
            isUnique={userGroups.length < 2}
          />
        ))
      )}
    </LeaderBoardWrapper>
  );
}

export default LeaderBoard;
