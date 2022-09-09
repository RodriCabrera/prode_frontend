import React from 'react';
import FixtureTable from './components/FixtureTable';
import LaterStagesGraph from './components/LaterStagesGraph';
import CollapsableStage from './components/CollapsableStage';
import { Spinner } from '../../common/Spinner/Spinner';
import { Text } from '../../common/common.styles';
import { useFetchFixtureData } from './hooks/useFetchFixtureData';
import {
  FixtureTablesContainer,
  FixtureWrapper,
  GroupTableWrapper,
} from './FixturePage.styles';
import { useIsMobile } from '../../hooks/useIsMobile';

function Fixture() {
  const { isLoading, fixtureData } = useFetchFixtureData();
  const isMobile = useIsMobile();

  const renderGroupsTables = (groups) => {
    if (!groups) return <Spinner />;
    return (
      <FixtureTablesContainer>
        {groups.map((group) => (
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
      {isMobile ? (
        <>
          {fixtureData.map((stage) => {
            if (stage.groups)
              return (
                <CollapsableStage stageName={stage.name}>
                  {renderGroupsTables(stage.groups)}
                </CollapsableStage>
              );
            else
              return (
                <CollapsableStage
                  stageName={stage.name}
                  stageData={stage.matches}
                />
              );
          })}
        </>
      ) : (
        <>
          <LaterStagesGraph />
          <Text size="2rem" weight="700" align="center">
            Fase de Grupos
          </Text>
          {isLoading ? <Spinner /> : renderGroupsTables(fixtureData[0]?.groups)}
        </>
      )}
    </FixtureWrapper>
  );
}

export default Fixture;
