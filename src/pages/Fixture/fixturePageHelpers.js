export const parseMatchScore = (score) => {
  if (score === 0) return '0';
  if (!score) return '';
  return score;
};

export const getStageId = (stageName) => {
  switch (stageName) {
    case '16round':
      return 'OCTAVOS';
    case '8round':
      return 'CUARTOS';
    case 'semis':
      return 'SEMIFINAL';
    case 'final':
      return 'FINAL';
    default:
      return null;
  }
};
