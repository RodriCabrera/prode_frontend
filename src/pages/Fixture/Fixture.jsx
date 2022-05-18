import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getGroupStage } from '../../api/fixture';
import FixtureTable from './FixtureTable';
import { Spinner } from '../../common/Spinner/Spinner';
import { Text } from '../../common/common.styles';

const FixtureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
    return fixtureData.map((group) => (
      <div>
        <h2>{group.name}</h2>
        <FixtureTable data={group.matches} />
      </div>
    ));
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
