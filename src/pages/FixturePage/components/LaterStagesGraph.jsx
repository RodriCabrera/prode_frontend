import StageMatches from "./StageMatches";
import FinalStage from "./FinalStage";

import { LaterStages } from "./laterStages.styles";

const STAGE_DATA = {
  OCTAVOS: "Octavos",
  CUARTOS: "Cuartos",
  SEMIS: "Semifinal",
  FINAL: "Final",
};

function LaterStagesGraph() {
  return (
    <LaterStages>
      <StageMatches
        stageName={STAGE_DATA.OCTAVOS}
        isFirst
        nextStage={STAGE_DATA.CUARTOS}
      />
      <StageMatches
        stageName={STAGE_DATA.CUARTOS}
        isFirst
        nextStage={STAGE_DATA.SEMIS}
      />
      <StageMatches
        stageName={STAGE_DATA.SEMIS}
        isFirst
        nextStage={STAGE_DATA.FINAL}
      />
      <FinalStage />
      <StageMatches
        stageName={STAGE_DATA.SEMIS}
        isFirst={false}
        nextStage={STAGE_DATA.FINAL}
      />
      <StageMatches
        stageName={STAGE_DATA.CUARTOS}
        isFirst={false}
        nextStage={STAGE_DATA.SEMIS}
      />
      <StageMatches
        stageName={STAGE_DATA.OCTAVOS}
        isFirst={false}
        nextStage={STAGE_DATA.CUARTOS}
      />
    </LaterStages>
  );
}

export default LaterStagesGraph;
