import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getGroupStage } from '../../api/fixture';
import FixtureTable from './FixtureTable';
import { Spinner } from '../../common/Spinner/Spinner';
import { Text } from '../../common/common.styles';

const FixtureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const GroupTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FixtureTablesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 4rem;
  align-items: center;
  justify-content: center;
`;

function Fixture() {
  const [isLoading, setIsLoading] = useState(false);
  const [fixtureData, setFixtureData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getGroupStage()
      .then((res) => {
        setFixtureData(res.data.fixture);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderGroupsTables = () => {
    return (
      <FixtureTablesContainer>
        {fixtureData.map((group) => (
          <GroupTableWrapper key={group.id}>
            <Text size="2rem" align="center" color="darkorange">
              {group.name}
            </Text>
            <FixtureTable data={group.matches} />
          </GroupTableWrapper>
        ))}
      </FixtureTablesContainer>
    );
  };

  return (
    <FixtureWrapper>
      <Text size="2rem" weight="700" align="center">
        Fase de Grupos
      </Text>
      {isLoading ? <Spinner /> : renderGroupsTables()}
    </FixtureWrapper>
  );
}

export default Fixture;
