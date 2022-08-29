import styled from '@emotion/styled';
import { HiOutlineUserGroup, HiCheck } from 'react-icons/hi';
import { Text } from '../../../common/common.styles';
import { ListElement } from '../../../common/Lists/ListElement';
import { ListWrapper } from '../../../common/Lists/Lists.styles';
import { BallLoader } from '../../../common/Spinner/BallLoader';
import { useIsMobile } from '../../../hooks/useIsMobile';

const GroupsListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export function GroupSelector({
  isLoading,
  selectedUserGroup,
  userGroupList,
  handleGroupSelect,
}) {
  const isMobile = useIsMobile();
  return (
    <>
      {isLoading && <BallLoader />}
      {userGroupList.length > 1 && (
        <>
          <Text size="1.4rem">Seleccioná un grupo:</Text>
          <GroupsListWrapper>
            <ListWrapper>
              {userGroupList?.map((userGroup) => {
                const isSelected = selectedUserGroup?.id === userGroup.id;

                return (
                  <ListElement
                    key={userGroup.id}
                    avatar={
                      isSelected ? (
                        <HiCheck size="1.8rem" />
                      ) : (
                        <HiOutlineUserGroup size="1.8rem" />
                      )
                    }
                    bgColor={isSelected && 'green'}
                    onClick={() => handleGroupSelect(userGroup)}
                    isMobile={isMobile}
                  >
                    <Text weight="600">{userGroup.name.toUpperCase()}</Text>
                  </ListElement>
                );
              })}
            </ListWrapper>
          </GroupsListWrapper>
        </>
      )}
    </>
  );
}
