import { getFixture, getGroupStage } from "../../../api/fixture";

export const STAGE_NAMES = {
  GRUPOS: "GRUPOS",
  OCTAVOS: "OCTAVOS",
  CUARTOS: "CUARTOS",
  SEMIS: "SEMIFINAL",
  FINAL: "FINAL",
  TERCER_PUESTO: "TERCER_PUESTO",
};

export const getStageName = (phase) => {
  switch (phase) {
    case "16":
      return STAGE_NAMES.OCTAVOS;
    case "8":
      return STAGE_NAMES.CUARTOS;
    case "semis":
      return STAGE_NAMES.SEMIS;
    case "final":
      return STAGE_NAMES.FINAL;
    case "3":
      return STAGE_NAMES.TERCER_PUESTO;
    case "groups":
    default:
      return STAGE_NAMES.GRUPOS;
  }
};

export const getPhaseFixture = (phase, signal) => {
  if (getStageName(phase) !== STAGE_NAMES.GRUPOS) {
    return getFixture("", getStageName(phase), signal);
  } else {
    return getGroupStage(signal);
  }
};
