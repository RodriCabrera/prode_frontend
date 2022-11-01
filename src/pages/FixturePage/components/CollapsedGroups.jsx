import { useState } from "react";

import FixtureTable from "./FixtureTable";

import { Text } from "common/common.styles";
import {
  FixtureTablesContainer,
  GroupButton,
  GroupButtonGroup,
  GroupTableWrapper,
} from "../FixturePage.styles";

export default function CollapsedGroups({ groups, isMobile }) {
  const [selected, setSelected] = useState([]);
  const handleButtonClick = (index) => {
    if (selected.includes(index))
      setSelected((prev) => [...prev.filter((val) => val !== index)]);
    else setSelected((prev) => [...prev, index]);
  };
  return (
    <>
      <GroupButtonGroup>
        {groups.map((group, index) => (
          <GroupButton
            key={group.name}
            onClick={() => handleButtonClick(index)}
            selected={selected.includes(index)}
          >
            {group.name}
          </GroupButton>
        ))}
      </GroupButtonGroup>
      <FixtureTablesContainer isMobile>
        {selected.sort().map((selection) => (
          <GroupTableWrapper key={groups[selection].id} fullWidth>
            <Text size="2rem" align="center" color="darkorange">
              {groups[selection].name}
            </Text>
            <FixtureTable
              data={groups[selection].matches}
              fullWidth={isMobile}
              isCompact
            />
          </GroupTableWrapper>
        ))}
      </FixtureTablesContainer>
    </>
  );
}
