export const getFlagUrl = (url, size) => {
  if (!url) return '?';
  const newUrl = url?.replace('{format}', 'sq').replace('{size}', size);
  return <img src={newUrl} alt="Country flag" />;
};

export const parseMatchScore = (score) => {
  if (score === 0) return '0';
  if (!score) return '';
  return score;
};

export const parseDate = (date) => {
  return new Date(date).toUTCString();
};
