import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getPredictionCompletePercentage } from '../../api/predictions';
import { getFixtureStatus } from '../../api/fixture';
import { Text } from '../../common/common.styles';
import { Banner } from './Banner';
import { BannerContainer } from './Predictions.styles';
import { Spinner } from '../../common/Spinner/Spinner';
import useCleanupController from '../../hooks/useCleanupController';

function BannerList() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const { selectedUserGroup, mode } = useOutletContext();
  const [predictedPercentages, setPredictedPercentages] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const [stageStatus, setStageStatus] = useState({
    GRUPOS: false,
    OCTAVOS: false,
    CUARTOS: false,
    SEMIFINAL: false,
    FINAL: false,
    TERCER_PUESTO: false,
  });
  const editMode = mode === 'edit';

  useEffect(() => {
    if (editMode) {
      setIsLoading(true);
      getPredictionCompletePercentage(selectedUserGroup?.id, signal)
        .then((res) => {
          setPredictedPercentages(res.data);
        })
        .catch(err => handleCancel(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
    return cleanup;
  }, [selectedUserGroup, editMode]);

  const calculatePercentage = (quantities) => {
    return Math.round((quantities.predicted / quantities.total) * 100);
  };

  useEffect(() => {
    getFixtureStatus()
      .then((res) => {
        setStageStatus(res.data);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }, []);

  const bannerData = [
    {
      id: 1,
      title: 'GRUPOS',
      path: 'groups',
      percentage: predictedPercentages.GRUPOS
        ? calculatePercentage(predictedPercentages.GRUPOS)
        : null,
    },
    {
      id: 2,
      title: 'OCTAVOS',
      path: '16',
      percentage: predictedPercentages.OCTAVOS
        ? calculatePercentage(predictedPercentages.OCTAVOS)
        : null,
    },
    {
      id: 3,
      title: 'CUARTOS',
      path: '8',
      percentage: predictedPercentages.CUARTOS
        ? calculatePercentage(predictedPercentages.CUARTOS)
        : null,
    },
    {
      id: 4,
      title: 'SEMIFINAL',
      path: 'semis',
      percentage: predictedPercentages.SEMIFINAL
        ? calculatePercentage(predictedPercentages.SEMIFINAL)
        : null,
    },
    {
      id: 5,
      title: 'TERCER PUESTO',
      path: '3',
      percentage: predictedPercentages.TERCER_PUESTO
        ? calculatePercentage(predictedPercentages.TERCER_PUESTO)
        : null,
    },
    {
      id: 6,
      title: 'FINAL',
      path: 'final',
      percentage: predictedPercentages.FINAL
        ? calculatePercentage(predictedPercentages.FINAL)
        : null,
    },
  ];

  return (
    <BannerContainer>
      <Text align="center" size="2rem" weight="700">
        FASES
      </Text>
      {loadingStatus ? (
        <Spinner />
      ) : (
        bannerData.map((stage) => {
          return (
            <Banner
              key={stage.id}
              title={stage.title}
              path={stage.path}
              percentage={stage.percentage}
              isLoading={isLoading}
              editMode={editMode}
              disabled={stageStatus[stage.title.replace(' ', '_')]}
            />
          );
        })
      )}
    </BannerContainer>
  );
}

export default BannerList;
