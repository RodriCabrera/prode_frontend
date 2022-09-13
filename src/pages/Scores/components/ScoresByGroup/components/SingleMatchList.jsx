import React from 'react';
import styled from '@emotion/styled';
import {
  CardContainer,
  CardWrapper,
  CardTitle,
  Text,
} from '../../../../../common/common.styles';
import { ListElement } from '../../../../../common/Lists/ListElement';
import { UserMiniAvatar } from '../../../../../common/UserMiniAvatar/UserMiniAvatar';

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  gap: 0.75rem;
  margin: 1rem;
`;

const UserListContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export default function SingleMatchList({ data, userAvatars, scoring }) {
  const groupedUsers = [
    {
      name: 'Resultado exacto',
      users: Object.entries(data)
        .filter(([key, value]) => value === scoring.FULL && key)
        .map(([key]) => key),
      color: 'green',
    },
    {
      name: 'Ganador acertado',
      users: Object.entries(data)
        .filter(([key, value]) => value === scoring.WINNER && key)
        .map(([key]) => key),
      color: 'gold',
    },
    {
      name: 'Sin aciertos',
      users: Object.entries(data)
        .filter(([key, value]) => value === scoring.NONE && key)
        .map(([key]) => key),
      color: 'tomato',
    },
  ];
  return (
    <ListContainer>
      {groupedUsers.map((group) => {
        return (
          <CardWrapper isMobile key={group.name}>
            <CardTitle>
              <span style={{ color: group.color, textDecoration: 'underline' }}>
                {group.name}
              </span>
            </CardTitle>
            {group.users.length > 0 ? (
              <UserListContainer>
                {group.users.map((user) => {
                  return (
                    <ListElement
                      key={user}
                      avatar={<UserMiniAvatar avatar={userAvatars[user]} />}
                    >
                      {user}
                    </ListElement>
                  );
                })}
              </UserListContainer>
            ) : (
              <Text align="center" margin="auto" size="1.2rem">
                Nadie
              </Text>
            )}
          </CardWrapper>
        );
      })}
    </ListContainer>
  );
}
