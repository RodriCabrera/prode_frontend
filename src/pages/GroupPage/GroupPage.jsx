import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { isEmpty } from 'lodash';
import { getGroupData, getGroupScores } from '../../api/groups';
import ListElement from '../../common/Lists/ListElement';
import { Spinner } from '../../common/Spinner/Spinner';
import { Text, CardContainer, Button } from '../../common/common.styles';
import LeaveGroupForm from '../Groups/components/LeaveGroupForm';

// TODO: Mostrar acuerdo/reglas del grupo.

function GroupPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState({});
  const [scoresData, setScoresData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupError, setGroupError] = useState();
  const [showLeave, setShowLeave] = useState(false);

  useEffect(() => {
    getGroupData(name)
      .then(({ data }) => {
        setGroup(data.groupData);
      })
      .catch((err) => {
        setGroupError(err.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getGroupScores(name)
      .then((res) => {
        setScoresData(res.data.scores);
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
      {group.name && (
        <>
          <Text size="2.5rem" align="center">
            {group.name}
          </Text>
          <Text size="1.5rem">Admin: {group.owner.name}</Text>
          <Text size="1.5rem">Miembros del grupo:</Text>
          {isEmpty(scoresData)
            ? 'Loading member scores...'
            : scoresData?.map((score) => (
                <ListElement
                  key={score.user}
                  avatar={<HiOutlineUserGroup size="1.8rem" />}
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
