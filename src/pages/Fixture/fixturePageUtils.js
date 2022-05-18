export const getFlagUrl = (url, size) => {
  if (!url) return '?';
  const newUrl = url?.replace('{format}', 'sq').replace('{size}', size);
  return <img src={newUrl} alt="Country flag" />;
};
