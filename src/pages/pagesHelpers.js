import styled from '@emotion/styled';

export const parseDate = (date, options = null) => {
  return new Date(date).toLocaleString(
    navigator.language,
    options || {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'short',
    }
  );
};

const FlagImg = styled.img`
  min-width: 42px;
  min-height: 28px;
`;

const FlagPlaceholder = styled.div`
  width: 48px;
  height: 28px;
  min-width: 48px;
  min-height: 28px;
  background: gray;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: auto;
`

export const getFlagUrl = (url, size) => {
  let newUrl;
  if (!url) {
    return <FlagPlaceholder>?</FlagPlaceholder>;
  } else newUrl = url?.replace('{format}', 'sq').replace('{size}', size);
  return <FlagImg src={newUrl} alt="Country flag"/>;
};

export const translateDuration = (miliseconds) => {
  switch (parseInt(miliseconds)) {
    case 1000 * 60 * 60 * 1:
      return ' una hora antes del partido';
    case 1000 * 60 * 60 * 12:
      return ' doce horas antes del partido';
    case 1000 * 60 * 60 * 24:
      return ' un día antes del partido';
    case 0:
    default:
      return ' el comienzo del partido';
  }
};
