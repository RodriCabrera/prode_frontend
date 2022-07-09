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
          console.log(res.data);
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
      path: 'first-stage',
      percentage: predictedPercentages.GRUPOS
        ? calculatePercentage(predictedPercentages.GRUPOS)
        : null,
      disabledStart: '2022-11-20',
      disabledEnd: '2022-01-01',
    },
    {
      id: 2,
      title: 'OCTAVOS',
      path: 'later-stages/16round',
      percentage: predictedPercentages.OCTAVOS
        ? calculatePercentage(predictedPercentages.OCTAVOS)
        : null,
      disabledStart: '2022-11-20',
      disabledEnd: '2022-01-01',
    },
    {
      id: 3,
      title: 'CUARTOS',
      path: 'later-stages/8round',
      percentage: predictedPercentages.CUARTOS
        ? calculatePercentage(predictedPercentages.CUARTOS)
        : null,
      disabledStart: '2022-11-20',
      disabledEnd: '2022-01-01',
    },
    {
      id: 4,
      title: 'SEMIS',
      path: 'later-stages/semis',
      percentage: predictedPercentages.SEMIFINAL
        ? calculatePercentage(predictedPercentages.SEMIFINAL)
        : null,
      disabledStart: '2022-11-20',
      disabledEnd: '2022-01-01',
    },
    {
      id: 5,
      title: 'TERCER PUESTO',
      path: 'later-stages/tercer_puesto',
      percentage: predictedPercentages.TERCER_PUESTO
        ? calculatePercentage(predictedPercentages.TERCER_PUESTO)
        : null,
      disabledStart: '2022-11-20',
      disabledEnd: '2022-01-01',
    },
    {
      id: 6,
      title: 'FINAL',
      path: 'later-stages/final',
      percentage: predictedPercentages.FINAL
        ? calculatePercentage(predictedPercentages.FINAL)
        : null,
      disabledStart: '2022-11-20',
      disabledEnd: '2022-01-01',
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
            disabledStart={stage.disabledStart}
            disabledEnd={stage.disabledStart}
          />
        );
      })}
    </BannerContainer>
  );
}

export default BannerList;
