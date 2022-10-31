import React from "react";
import { useFlags } from "flagsmith/react";
import FixtureTable from "./components/FixtureTable";
import LaterStagesGraph from "./components/LaterStagesGraph";
import CollapsableStage from "./components/CollapsableStage";
import CollapsedGroups from "./components/CollapsedGroups";
import { Spinner } from "../../common/Spinner/Spinner";
import { useFetchFixtureData } from "./hooks/useFetchFixtureData";
import { useIsMobile } from "../../hooks/useIsMobile";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import {
  FixtureTablesContainer,
  FixtureWrapper,
  GroupTableWrapper,
} from "./FixturePage.styles";
import { Text } from "../../common/common.styles";

function Fixture() {
  const { isLoading, fixtureData } = useFetchFixtureData();
  const isMobile = useIsMobile();
  const { width } = useWindowDimensions();
  const flags = useFlags(["collapse_groups_fixture"]);

  const renderGroupsTables = (groups) => {
    if (!groups) return <Spinner />;
    return flags.collapse_groups_fixture.enabled ? (
      <CollapsedGroups groups={groups} isMobile={isMobile} />
    ) : (
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
      {width < 1060 ? (
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
