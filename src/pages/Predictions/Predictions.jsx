import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Text } from '../../common/common.styles';
import ToggleSwitch from '../../common/ToggleSwitch';
import {
  BannerTitle,
  PredictionsPageWrapper,
  ToggleContainer,
  ToggleWrapper,
} from './Predictions.styles';

function Predictions() {
  const location = useLocation();
  const [mode, setMode] = useState(location.pathname.split('/')[2]);
  const navigate = useNavigate();

  useEffect(() => {
    return mode === 'results'
      ? navigate('/predictions/results')
      : navigate('/predictions/edit');
  }, [mode]);

  return (
    <PredictionsPageWrapper id="mi-prode-container">
      <BannerTitle align="center">PREDICCIONES</BannerTitle>
      <ToggleContainer>
        <ToggleWrapper>
          <Text weight="700">RESULTADOS</Text>
          <ToggleSwitch mode={{ mode, setMode }} />
          <Text weight="700" color="tomato">
            PREDECIR
          </Text>
        </ToggleWrapper>
      </ToggleContainer>
      <Outlet />
    </PredictionsPageWrapper>
  );
}

export default Predictions;
