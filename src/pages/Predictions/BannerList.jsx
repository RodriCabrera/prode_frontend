import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getPredictionCompletePercentage } from '../../api/predictions';
import { Text } from '../../common/common.styles';
import { Banner } from './Banner';
import { BannerContainer } from './Predictions.styles';

function BannerList() {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedUserGroup, mode } = useOutletContext();
  const [predictedPercentages, setPredictedPercentages] = useState([]);
  const editMode = mode === 'edit';

  useEffect(() => {
    if (editMode) {
      setIsLoading(true);
      getPredictionCompletePercentage(selectedUserGroup?.id)
        .then((res) => {
          setPredictedPercentages(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedUserGroup, editMode]);

  const calculatePercentage = (quantities) => {
    return Math.round((quantities.predicted / quantities.total) * 100);
  };

  const bannerData = [
    {
      id: 1,
      title: 'GRUPOS',
      path: 'groups',
      percentage: predictedPercentages.GRUPOS
        ? calculatePercentage(predictedPercentages.GRUPOS)
        : null,
      prevStage: null,
      // disabledStart: '2022-11-20',
      // disabledEnd: '2022-01-01',
    },
    {
      id: 2,
      title: 'OCTAVOS',
      path: '16',
      percentage: predictedPercentages.OCTAVOS
        ? calculatePercentage(predictedPercentages.OCTAVOS)
        : null,
      prevStage: 'GRUPOS',
      // disabledStart: '2022-11-20',
      // disabledEnd: '2022-01-01',
    },
    {
      id: 3,
      title: 'CUARTOS',
      path: '8',
      percentage: predictedPercentages.CUARTOS
        ? calculatePercentage(predictedPercentages.CUARTOS)
        : null,
      prevStage: 'OCTAVOS',
      // disabledStart: '2022-11-20',
      // disabledEnd: '2022-01-01',
    },
    {
      id: 4,
      title: 'SEMIS',
      path: 'semis',
      percentage: predictedPercentages.SEMIFINAL
        ? calculatePercentage(predictedPercentages.SEMIFINAL)
        : null,
      prevStage: 'CUARTOS',
      // disabledStart: '2022-11-20',
      // disabledEnd: '2022-01-01',
    },
    {
      id: 5,
      title: 'TERCER PUESTO',
      path: '3',
      percentage: predictedPercentages.TERCER_PUESTO
        ? calculatePercentage(predictedPercentages.TERCER_PUESTO)
        : null,
      prevStage: 'SEMIFINAL',
      // disabledStart: '2022-11-20',
      // disabledEnd: '2022-01-01',
    },
    {
      id: 6,
      title: 'FINAL',
      path: 'final',
      percentage: predictedPercentages.FINAL
        ? calculatePercentage(predictedPercentages.FINAL)
        : null,
      prevStage: 'SEMIFINAL',
      // disabledStart: '2022-11-20',
      // disabledEnd: '2022-01-01',
    },
  ];

  return (
    <BannerContainer>
      <Text align="center" size="2rem" weight="700">
        FASES
      </Text>
      {bannerData.map((stage) => {
        return (
          <Banner
            key={stage.id}
            title={stage.title}
            path={stage.path}
            percentage={stage.percentage}
            isLoading={isLoading}
            editMode={editMode}
            prevStage={stage.prevStage}
            // disabledStart={stage.disabledStart}
            // disabledEnd={stage.disabledStart}
          />
        );
      })}
    </BannerContainer>
  );
}

export default BannerList;
