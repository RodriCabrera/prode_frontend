export const parseDate = (date) => {
  return new Date(date).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
  });
};

export const getFlagUrl = (url, size) => {
  let newUrl;
  if (!url) {
    newUrl = 'https://via.placeholder.com/42x28';
  } else newUrl = url?.replace('{format}', 'sq').replace('{size}', size);
  return <img src={newUrl} alt="Country flag" />;
};
