export const getFlagUrl = (url, size) => {
  let newUrl;
  if (!url) newUrl = '';
  newUrl = url?.replace('{format}', 'sq').replace('{size}', size);
  return <img src={newUrl} alt="Country flag" />;
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
