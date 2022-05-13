import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { Text } from '../../../common/common.styles';

const GroupListElement = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
`;
const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkorange;
  border-radius: 100%;
  height: 2.5rem;
  width: 2.5rem;
`;
function GroupList({ groups }) {
  const navigate = useNavigate();

  const handleClick = (group) => {
    navigate(`/groups/${group.name}`);
    console.log('click');
  };

  if (isEmpty(groups)) {
    return <p>No perteneces a ningún grupo</p>;
  }
  console.log(groups);
  return groups.map((group) => (
    <GroupListElement key={group} onClick={() => handleClick(group)}>
      <AvatarWrapper>
        <HiOutlineUserGroup size="1.8rem" />
      </AvatarWrapper>
      <div>
        <Text size="1.3rem">
          <Text to={`/groups/${group.name}`}>{group.name}</Text>
        </Text>
        <Text>Admin: {group.owner}</Text>
        <Text>Integrantes: {group.members.length}</Text>
      </div>
    </GroupListElement>
  ));
}

export default GroupList;
