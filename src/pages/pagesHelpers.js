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

export const translateDuration = (miliseconds) => {
  switch (miliseconds) {
    case 1000 * 60 * 60 * 1:
      return ' una hora antes del partido';
    case 1000 * 60 * 60 * 12:
      return ' doce horas antes del partido';
    case 1000 * 60 * 60 * 24:
      return ' un día antes del partido';
    case 1000 * 60 * 60 * 24 * 7:
      return ' una semana antes del partido';
    case 0:
    default:
      return ' el comienzo del partido';
  }
};
