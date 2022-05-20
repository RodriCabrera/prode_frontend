import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { isEmpty } from 'lodash';
import { getGroupData, getGroupScores } from '../../api/groups';
import ListElement from '../../common/Lists/ListElement';
import { Spinner } from '../../common/Spinner/Spinner';
import { Text, CardContainer } from '../../common/common.styles';
import LeaveGroupForm from '../Groups/components/LeaveGroupForm';

// TODO: Boton para salir del grupo.
// TODO: Mostrar acuerdo/reglas del grupo.

function GroupPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState({});
  const [scoresData, setScoresData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupError, setGroupError] = useState();
  // ? Queda como toast o mejor display en el body que diga si el grupo no existe o el usuario no es parte?

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
            <LeaveGroupForm updater={onGroupExit} />
          </CardContainer>
        </>
      )}
    </>
  );
}

export default GroupPage;
