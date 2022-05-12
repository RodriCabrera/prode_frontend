import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const GroupLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  :hover {
    text-decoration: underline;
    box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.1);
  }
  overflow: hidden;
`;

const GroupsDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0rem 1rem;
  justify-content: center;
`;

function GroupList({ groups }) {
  return (
    <>
      {groups.length === 0 && <p>No perteneces a ningún grupo</p>}
      <GroupsDisplay>
        {groups.length > 0 &&
          groups.map((group) => (
            <GroupLink to={`/groups/${group.name}`}>{group.name}</GroupLink>
          ))}
      </GroupsDisplay>
    </>
  );
}

export default GroupList;
