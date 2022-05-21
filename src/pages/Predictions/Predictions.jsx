import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Button, Text } from '../../common/common.styles';
import ToggleSwitch from '../../common/ToggleSwitch';
import {
  BannerTitle,
  OptionsWrapper,
  PredictionsPageWrapper,
  ToggleContainer,
  ToggleWrapper,
} from './Predictions.styles';

function Predictions() {
  const [mode, setMode] = useState('resultados');
  const navigate = useNavigate();

  useEffect(() => {
    return mode === 'resultados'
      ? navigate('/predictions/results')
      : navigate('/predictions/edit');
  }, [mode]);

  console.log(mode);
  return (
    <PredictionsPageWrapper id="mi-prode-container">
      <BannerTitle align="center">Predicciones</BannerTitle>
      <ToggleContainer>
        <ToggleWrapper>
          <Text weight="700">RESULTADOS</Text>
          <ToggleSwitch mode={{ mode, setMode }} />
          <Text weight="700" color="tomato">
            PREDECIR
          </Text>
        </ToggleWrapper>
      </ToggleContainer>
      {/* {mode === 'resultados' ? (
        <Navigate to="/predictions/results" />
      ) : (
        <Navigate to="/predictions/edit" />
      )} */}
      {/* <OptionsWrapper>
        <Button grayscale>
          <Link to="/predictions/results">RESULTADOS</Link>
        </Button>
        <Button grayscale>
          <Link to="/predictions/edit">PREDECIR</Link>
        </Button>
      </OptionsWrapper> */}
      <Outlet />
    </PredictionsPageWrapper>
  );
}

export default Predictions;
