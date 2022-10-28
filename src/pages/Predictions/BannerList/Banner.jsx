import React from "react";
import { isNil } from "lodash";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  BannerButton,
  BannerDataWrapper,
  BannerTitle,
} from "../Predictions.styles";
import { Text } from "../../../common/common.styles";

export function Banner({ title, path, percentage, isLoading, disabled }) {
  const navigate = useNavigate();
  const { mode, setMode } = useOutletContext();
  const editMode = mode === "edit";

  const renderPercentageInfo = () => {
    if (editMode && disabled) {
      if (isLoading) {
        return <Text weight="200">Cargando %...</Text>;
      }
      return (
        editMode && (
          <Text weight="200">
            {!isNil(percentage) ? `${percentage} % completo` : ""}
          </Text>
        )
      );
    }
    return null;
  };

  const handleClick = () => {
    if (percentage === 100 && mode != "results") setMode("results");
    navigate(path);
  };

  return (
    <BannerButton
      padding="8px 16px"
      disabled={!disabled}
      onClick={handleClick}
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
