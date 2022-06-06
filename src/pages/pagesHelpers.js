export const parseDate = (date) => {
  return new Date(date).toUTCString().split(' ').slice(1, 6).join(' ');
};

export const getFlagUrl = (url, size) => {
  let newUrl;
  if (!url) newUrl = '';
  newUrl = url?.replace('{format}', 'sq').replace('{size}', size);
  return <img src={newUrl} alt="Country flag" />;
};
