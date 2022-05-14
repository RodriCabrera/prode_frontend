import { isEmpty } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { Text } from '../../../common/common.styles';
import ListWrapper from '../../../common/Lists/ListWrapper';

function GroupList({ groups }) {
  const navigate = useNavigate();

  const handleClick = (group) => {
    navigate(`/groups/${group.name}`);
  };

  if (isEmpty(groups)) {
    return <Text size="1.5rem">No perteneces a ningún grupo</Text>;
  }

  return groups.map((group) => (
    <ListWrapper
      key={group.name}
      onClick={() => handleClick(group)}
      avatar={<HiOutlineUserGroup size="1.8rem" />}
    >
      <div>
        <Text size="1.3rem">
          <Text>{group.name}</Text>
        </Text>
        <Text>Admin: {group.owner}</Text>
        <Text>Integrantes: {group.members.length}</Text>
      </div>
    </ListWrapper>
  ));
}

export default GroupList;
