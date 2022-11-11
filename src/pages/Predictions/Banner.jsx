import React from "react";
import { isNil } from "lodash";
import { useNavigate } from "react-router-dom";
import { Text } from "../../common/common.styles";
import {
  BannerButton,
  BannerDataWrapper,
  BannerTitle,
} from "./Predictions.styles";
import { useTranslation } from "react-i18next";

export function Banner({
  title,
  path,
  percentage,
  isLoading,
  editMode,
  disabled,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const renderPercentageInfo = () => {
    if (editMode && disabled) {
      if (isLoading) {
        return <Text weight="200">Loading %...</Text>;
      }
      return (
        editMode && (
          <Text weight="200">
            {!isNil(percentage) ? `${percentage} % ${(t('completed'))}` : ""}
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
