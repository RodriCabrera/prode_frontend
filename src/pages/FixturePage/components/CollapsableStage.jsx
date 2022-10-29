import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import { CollapsableStageButton } from "./laterStages.styles";
import FixtureTable from "./FixtureTable";

import { Text } from "common/common.styles";

export default function CollapsableStage({ children, stageName, stageData }) {
  const [isSelected, setSelected] = useState(false);
  const handleSelection = () => {
    setSelected((prevState) => !prevState);
  };
  return (
    <>
      <CollapsableStageButton onClick={handleSelection}>
        <Text>{stageName}</Text>
        {isSelected ? <HiChevronUp /> : <HiChevronDown />}
      </CollapsableStageButton>
      {isSelected &&
        (stageData ? (
          <FixtureTable data={stageData} fullWidth isCompact />
        ) : (
          children
        ))}
    </>
  );
}
