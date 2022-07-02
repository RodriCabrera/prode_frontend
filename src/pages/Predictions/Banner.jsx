import { isNull } from 'lodash';
import { useNavigate } from 'react-router-dom';
import {
  BannerButton,
  BannerDataWrapper,
  BannerTitle,
} from './Predictions.styles';

export function Banner({
  title,
  path,
  percentage,
  isLoading,
  editMode,
  disabledStart,
  disabledEnd,
}) {
  const navigate = useNavigate();
  // TODO: Habría que emprolijar esta funcion para que vaya liberando los stages según la fecha y hora.
  // *: Por ahora lo dejo desactivado para poder ver los banners con la data del mundial pasado
  // eslint-disable-next-line no-unused-vars
  const setDisabledField = (disablingDate, enablingDate) => {
    // const today = new Date();
    // const endDate = new Date(disablingDate);
    // const startDate = new Date(enablingDate);
    // return today > endDate || today < startDate;
    return '';
  };

  return (
    <BannerButton
      disabled={setDisabledField(disabledStart, disabledEnd)}
      onClick={() => navigate(path)}
    >
      <BannerDataWrapper>
        <BannerTitle>{title}</BannerTitle>
        <p>Ver/Editar</p>
      </BannerDataWrapper>
      {!isLoading && editMode && (
        <BannerDataWrapper>
          {!isNull(percentage) ? `${percentage} % completo` : ''}
        </BannerDataWrapper>
      )}
    </BannerButton>
  );
}
