import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import UserMiniAvatar from '../../common/UserMiniAvatar/UserMiniAvatar';
import { getGroupScores } from '../../api/groups';
import ListElement from '../../common/Lists/ListElement';
import { Spinner } from '../../common/Spinner/Spinner';
import { Text, CardContainer, Button } from '../../common/common.styles';
import LeaveGroupForm from '../Groups/components/LeaveGroupForm';

// TODO: Mostrar acuerdo/reglas del grupo.

function GroupPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [scoresData, setScoresData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupError, setGroupError] = useState();
  const [showLeave, setShowLeave] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getGroupScores(name)
      .then((res) => {
        setScoresData(res.data);
      })
      .catch((err) => {
        setGroupError(err.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (!isEmpty(groupError)) {
    return (
      <>
        <Text size="2.5rem" align="center">
          {name}
        </Text>
        <Text align="center" color="tomato" size="1.5rem">
          {groupError}
        </Text>
      </>
    );
  }
  const onGroupExit = () => {
    navigate('/groups');
  };
  return (
    <>
      {isLoading && <Spinner />}
      {scoresData?.group?.name && (
        <>
          <Text size="2.5rem" align="center">
            {name}
          </Text>
          <Text size="1.5rem">Admin: {scoresData.group.owner}</Text>
          <Text size="1.5rem">Miembros del grupo:</Text>
          {scoresData.scores?.map((score) => (
            <ListElement
              onClick={() => navigate(`/profile/${score.user}`)}
              key={score.user}
              avatar={
                <UserMiniAvatar avatar={score.avatar} name={score.user} />
              }
            >
              <Text>{`${score.user} : ${score.score} pts`}</Text>
            </ListElement>
          ))}
          <CardContainer>
            <Button
              grayscale
              onClick={() => {
                setShowLeave(!showLeave);
              }}
            >
              Salir del grupo?
            </Button>
          </CardContainer>
          <CardContainer>
            {showLeave && <LeaveGroupForm updater={onGroupExit} />}
          </CardContainer>
        </>
      )}
    </>
  );
}

export default GroupPage;
