import React from 'react';
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
  disabled,
}) {
  const navigate = useNavigate();

  const renderPercentageInfo = () => {
    if (editMode && disabled) {
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
      padding="8px 16px"
      disabled={!disabled}
      onClick={() => navigate(path)}
      tertiary={editMode && disabled}
      grayscale={!disabled}
    >
      <BannerDataWrapper>
        <BannerTitle>{title}</BannerTitle>
      </BannerDataWrapper>
      {renderPercentageInfo()}
    </BannerButton>
  );
}
