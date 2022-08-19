import { useState, useEffect } from 'react';
import { isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Text } from '../../common/common.styles';
import { checkIfStageIsEnabled } from './predictionsPageUtils';
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
  prevStage,
}) {
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    checkIfStageIsEnabled(prevStage)
      .then((res) => setIsDisabled(!res))
      .catch(() => setIsDisabled(true));
  }, [editMode, prevStage]);

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
      disabled={isDisabled}
      onClick={() => navigate(path)}
      tertiary={editMode && !isDisabled}
      grayscale={isDisabled}
    >
      <BannerDataWrapper>
        <BannerTitle>{title}</BannerTitle>
        <p>Ver/Editar</p>
      </BannerDataWrapper>
      {renderPercentageInfo()}
    </BannerButton>
  );
}
