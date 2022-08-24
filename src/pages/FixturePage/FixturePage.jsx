import React from 'react';
import { FixtureTable } from './components/FixtureTable';
import LaterStagesGraph from './components/LaterStagesGraph';
import { Spinner } from '../../common/Spinner/Spinner';
import { Button, Text } from '../../common/common.styles';
import { useFetchFixtureData } from './hooks/useFetchFixtureData';
import {
  FixtureTablesContainer,
  FixtureWrapper,
  GroupTableWrapper,
} from './FixturePage.styles';
import { toast } from 'react-toastify';
import { useIsMobile } from '../../hooks/useIsMobile';

function Fixture() {
  const { isLoading, fixtureData } = useFetchFixtureData();
  const isMobile = useIsMobile();

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
  const fireToast = () => {
    toast('🦄 Wow so easy!', {});
  };
  return (
    <FixtureWrapper>
      <Button
        onClick={() => {
          fireToast();
        }}>
        AAOAOOA
      </Button>
      {!isMobile && <LaterStagesGraph />}
      <Text size="2rem" weight="700" align="center">
        Fase de Grupos
      </Text>
      {isLoading ? <Spinner /> : renderGroupsTables()}
    </FixtureWrapper>
  );
}

export default Fixture;
