import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getPredictions } from '../../api/predictions';
import { Text } from '../../common/common.styles';
import {
  Banner,
  BannerContainer,
  BannerDataWrapper,
  BannerTitle,
} from './Predictions.styles';

function BannerList({ editMode }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const selectedGroup = useOutletContext();
  const [groupsPredictedQty, setGroupsPredictedQty] = useState(undefined);

  useEffect(() => {
    if (editMode) {
      setIsLoading(true);
      getPredictions(selectedGroup.id, 'GRUPOS')
        .then((res) => {
          setGroupsPredictedQty(res.data.length);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedGroup]);

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

  const calculatePercentage = (predictionsQty, totalGroups) => {
    return Math.round((predictionsQty / totalGroups) * 100);
  };

  return (
    <BannerContainer>
      <Text align="center" size="2rem" weight="700">
        FASES
      </Text>
      <Banner
        disabled={setDisabledField('2022-11-20', '2022-01-01')}
        onClick={() => navigate('first-stage')}
      >
        <BannerDataWrapper>
          <BannerTitle>GRUPOS</BannerTitle>
          <p>Ver/Editar</p>
        </BannerDataWrapper>
        {!isLoading && editMode && (
          <BannerDataWrapper>
            {calculatePercentage(groupsPredictedQty, 48)}% completo
          </BannerDataWrapper>
        )}
      </Banner>
      <Banner
        disabled={setDisabledField('2022-13-02', '2022-12-02')}
        onClick={() => navigate('later-stages/16round')}
      >
        <BannerDataWrapper>
          <BannerTitle>OCTAVOS</BannerTitle>
          <p>Ver/Editar</p>
        </BannerDataWrapper>
      </Banner>
      <Banner
        disabled={setDisabledField('2022-12-08', '2022-12-02')}
        onClick={() => navigate('later-stages/8round')}
      >
        <BannerDataWrapper>
          <BannerTitle>CUARTOS</BannerTitle>
          <p>Ver/Editar</p>
        </BannerDataWrapper>
      </Banner>
      <Banner
        disabled={setDisabledField('2022-12-12', '2022-12-02')}
        onClick={() => navigate('later-stages/semis')}
      >
        <BannerDataWrapper>
          <BannerTitle>SEMIFINALES</BannerTitle>
          <p>Ver/Editar</p>
        </BannerDataWrapper>
      </Banner>
      <Banner
        disabled={setDisabledField('2022-12-16', '2022-12-02')}
        onClick={() => navigate('later-stages/final')}
      >
        <BannerDataWrapper>
          <BannerTitle>FINAL</BannerTitle>
          <p>Ver/Editar</p>
        </BannerDataWrapper>
      </Banner>
    </BannerContainer>
  );
}

export default BannerList;
