export const parseMatchScore = (score) => {
  if (score === 0) return "0";
  if (!score) return "";
  return score;
};

export const getStageId = (stageName) => {
  switch (stageName) {
    case "16round":
      return "OCTAVOS";
    case "8round":
      return "CUARTOS";
    case "semis":
      return "SEMIFINAL";
    case "tercer_puesto":
      return "TERCER_PUESTO";
    case "final":
      return "FINAL";
    default:
      return null;
  }
};

export const organizeStageBranches = (stageName, matches) => {
  const organizedLeft = [];
  const organizedRight = [];
  switch (stageName) {
    case "Octavos":
      organizedLeft.push(...matches.slice(0, 2), ...matches.slice(4, 6));
      organizedRight.push(...matches.slice(2, 4), ...matches.slice(6));
      break;
    case "Cuartos":
      organizedLeft.push(...matches.slice(0, 2));
      organizedRight.push(...matches.slice(2));
      break;
    default:
      organizedLeft.push(matches[0]);
      organizedRight.push(matches[1]);
  }
  return { left: organizedLeft, right: organizedRight };
};

export const datePreferences = {
  hour: "2-digit",
  minute: "2-digit",
  day: "numeric",
  month: "numeric",
};
