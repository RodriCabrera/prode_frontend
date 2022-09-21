import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { Text } from '../../../common/common.styles';
import { ListElement } from '../../../common/Lists/ListElement';

const GroupListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
function GroupList({ groups }) {
  const navigate = useNavigate();

  const handleClick = (group) => {
    navigate(`/groups/${group.name}`);
  };

  if (isEmpty(groups)) {
    return (
      <Text size="1.5rem" align="center" margin="1rem">
        No perteneces a ningún grupo
      </Text>
    );
  }

  return (
    <GroupListWrapper>
      {groups.map((group) => (
        <ListElement
          key={group.name}
          onClick={() => handleClick(group)}
          avatar={<HiOutlineUserGroup size="1.8rem" />}
        >
          <div>
            <Text size="1.3rem">{group.name}</Text>
            <Text>Admin: {group.owner}</Text>
            <Text>Integrantes: {group.members.length}</Text>
          </div>
        </ListElement>
      ))}
    </GroupListWrapper>
  );
}

export default GroupList;
