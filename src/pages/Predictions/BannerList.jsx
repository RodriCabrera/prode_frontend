import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getPredictions } from '../../api/predictions';
import { Text } from '../../common/common.styles';
import { Banner } from './Banner';
import { BannerContainer } from './Predictions.styles';

function BannerList() {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedUserGroup } = useOutletContext();
  const [groupsPredictedQty, setGroupsPredictedQty] = useState(undefined);
  const { mode } = useOutletContext();
  const editMode = mode === 'edit';

  useEffect(() => {
    if (editMode) {
      setIsLoading(true);
      getPredictions(selectedUserGroup?.id, 'GRUPOS')
        .then((res) => {
          setGroupsPredictedQty(res.data.length);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedUserGroup, editMode]);

  const calculatePercentage = (predictionsQty, totalGroups) => {
    return Math.round((predictionsQty / totalGroups) * 100);
  };

  const bannerData = [
    {
      id: 1,
      title: 'GRUPOS',
      path: 'first-stage',
      percentage: calculatePercentage(groupsPredictedQty, 48),
      disabledStart: '2022-11-20',
      disabledEnd: '2022-01-01',
    },
    {
      id: 2,
      title: 'OCTAVOS',
      path: 'later-stages/16round',
      percentage: null,
      disabledStart: '2022-11-20',
      disabledEnd: '2022-01-01',
    },
    {
      id: 3,
      title: 'CUARTOS',
      path: 'later-stages/8round',
      percentage: null,
      disabledStart: '2022-11-20',
      disabledEnd: '2022-01-01',
    },
    {
      id: 4,
      title: 'SEMIS',
      path: 'later-stages/semis',
      percentage: null,
      disabledStart: '2022-11-20',
      disabledEnd: '2022-01-01',
    },
    {
      id: 5,
      title: 'FINAL',
      path: 'later-stages/semis',
      percentage: null,
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
