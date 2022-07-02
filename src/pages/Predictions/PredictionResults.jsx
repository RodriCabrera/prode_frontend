import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import { HiOutlineUserGroup, HiCheck } from 'react-icons/hi';
import { Outlet } from 'react-router-dom';
import { getUserGroups } from '../../api/groups';
import { getAllPredictions } from '../../api/predictions';
import { Text } from '../../common/common.styles';
import { ListElement } from '../../common/Lists/ListElement';
import { ListWrapper } from '../../common/Lists/Lists.styles';
import { Spinner } from '../../common/Spinner/Spinner';

const GroupsListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
function PredictionResults() {
  const [userGroupList, setUserGroupList] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserGroup, setSelectedUserGroup] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUserGroups()
      .then(({ data }) => {
        setUserGroupList(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getAllPredictions()
      .then((res) => setPredictions(res.data))
      .finally(() => setIsLoading(false));
  }, [selectedUserGroup]);

  const handleGroupSelect = (group) => {
    setSelectedUserGroup(group);
  };

  if (isLoading) return <Spinner />;

  if (isEmpty(predictions)) return <Text>Aún no hiciste predicciones</Text>;

  return (
    <>
      <Text size="1.4rem">Elegí un grupo para ver los resultados:</Text>
      <GroupsListWrapper>
        {isLoading && <Spinner />}

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
              >
                <Text weight="600">{userGroup.name.toUpperCase()}</Text>
              </ListElement>
            );
          })}
        </ListWrapper>
      </GroupsListWrapper>
      {/* TODO: El context puede englobar un nivel mas */}
      {!isLoading && selectedUserGroup?.id && (
        <Outlet context={[selectedUserGroup]} />
      )}
    </>
  );
}

export default PredictionResults;
