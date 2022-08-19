import React from 'react';
import styled from '@emotion/styled';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { FixtureTable } from './components/FixtureTable';
import LaterStagesGraph from './components/LaterStagesGraph';
import { Spinner } from '../../common/Spinner/Spinner';
import { Text } from '../../common/common.styles';
import { useFetchFixtureData } from './hooks/useFetchFixtureData';

const FixtureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 700px;
`;
const GroupTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: ${({ fullWidth }) => (fullWidth ? 1 : 'initial')};
`;

const FixtureTablesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 4rem;
  align-items: center;
  justify-content: center;
`;

function Fixture() {
  const { width } = useWindowDimensions();
  const { isLoading, fixtureData } = useFetchFixtureData();
  // TODO: Ponerse de acuerdo en este número, si va a ser global o depende el caso. Porque me parece que sin hacer ajustes acá queda mejor así
  const isMobile = width <= 600;

  const renderGroupsTables = () => {
    return (
      <FixtureTablesContainer>
        {fixtureData.map((group) => (
          <GroupTableWrapper key={group.id} fullWidth={isMobile}>
            <Text size="2rem" align="center" color="darkorange">
              {group.name}
            </Text>
            <FixtureTable data={group.matches} fullWidth={isMobile} />
          </GroupTableWrapper>
        ))}
      </FixtureTablesContainer>
    );
  };

  return (
    <FixtureWrapper>
      <LaterStagesGraph />
      <Text size="2rem" weight="700" align="center">
        Fase de Grupos
      </Text>
      {isLoading ? <Spinner /> : renderGroupsTables()}
    </FixtureWrapper>
  );
}

export default Fixture;
