import { isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Text } from '../../common/common.styles';
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

  const renderPercentageInfo = () => {
    if (editMode) {
      if (isLoading) {
        return <Text weight="200">Cargando %...</Text>;
      }
      return (
        editMode && (
          <Text weight="200">
            {!isNil(percentage) ? `${percentage} % completo` : ''}
          </Text>
        )
      );
    }
    return null;
  };

  return (
    <BannerButton
      disabled={setDisabledField(disabledStart, disabledEnd)}
      onClick={() => navigate(path)}
      tertiary={editMode}
    >
      <BannerDataWrapper>
        <BannerTitle>{title}</BannerTitle>
        <p>Ver/Editar</p>
      </BannerDataWrapper>
      {renderPercentageInfo()}
    </BannerButton>
  );
}
