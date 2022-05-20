import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { getGroupData, getGroupScores, leaveGroup } from '../../api/groups';
import ListElement from '../../common/Lists/ListElement';
import { Spinner } from '../../common/Spinner/Spinner';
import { Text, Button } from '../../common/common.styles';

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
        console.log('LO AGARRA ACA?');
        // console.log(err.response.data.error);
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

  const handleLeaveGroup = () => {
    toast.promise(
      leaveGroup(name).then(() => {
        navigate('/groups');
      }),
      {
        pending: 'Leaving group...',
        success: 'You left the group',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };
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
          <Button onClick={handleLeaveGroup}>Salir del grupo</Button>
        </>
      )}
    </>
  );
}

export default GroupPage;
