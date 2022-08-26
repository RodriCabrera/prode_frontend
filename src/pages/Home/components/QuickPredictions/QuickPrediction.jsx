import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomUnpredictedMatch } from '../../../../api/predictions';
import {
  CardWrapper,
  CardContainer,
  Text,
} from '../../../../common/common.styles';
import { GroupInfo, GroupAvatar } from './quickPredictions.styles';
import MiniForm from './MiniForm';
import { Spinner } from '../../../../common/Spinner/Spinner';
import { HiOutlineUserGroup } from 'react-icons/hi';
import useCleanupController from '../../../../hooks/useCleanupController';

export default function QuickPrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [matchData, setMatchData] = useState({});
  const [groupData, setGroupData] = useState({});
  const [signal, cleanup, handleCancel] = useCleanupController();
  const navigate = useNavigate();

  const getMatchData = () => {
    setIsLoading(true);
    getRandomUnpredictedMatch(signal)
      .then((res) => {
        setMatchData(res.data.match);
        setGroupData(res.data.group);
      })
      .catch((err) => handleCancel(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getMatchData();
    return cleanup;
  }, []);

  return (
    <CardContainer>
      <CardWrapper>
        <Text size="1.5rem" align="center">
          Predicción al paso
        </Text>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {groupData && (
              <GroupInfo>
                <GroupAvatar onClick={() => navigate(`/groups/${groupData.name}`)}>
                  <HiOutlineUserGroup size="1.4rem" />
                </GroupAvatar>
                <Text>{groupData.name}</Text>
              </GroupInfo>
            )}
            {matchData.id && (
              <MiniForm
                matchData={matchData}
                groupData={groupData}
                afterSubmit={getMatchData}
              />
            )}
          </>
        )}
      </CardWrapper>
    </CardContainer>
  );
}
