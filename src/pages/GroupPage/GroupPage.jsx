import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { getGroupData, getGroupScores, leaveGroup } from '../../api/groups';
import ListWrapper from '../../common/Lists/ListWrapper';
import { Spinner } from '../../common/Spinner/Spinner';
import { Text, Button } from '../../common/common.styles';

// TODO: Boton para salir del grupo.
// TODO: Mostrar acuerdo/reglas del grupo.

function GroupPage() {
  const { name } = useParams();
  const [group, setGroup] = useState({});
  const [scoresData, setScoresData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // // TODO: Implementar toast promise:
    // ? Queda como toast o mejor display en el body que diga si el grupo no existe o el usuario no es parte?
    toast.promise(
      getGroupData(name)
        .then(({ data }) => {
          setGroup(data.groupData);
        })
        //   // TODO: handle error : Mostrar el msg en el toast?
        // .catch((error) => {
        //   if (error.request.status === 401) {
        //     alert('You are not a member of this group');
        //   } else if (error.request.status === 400) {
        //     alert('Group does not exist');
        //   } else {
        //     console.error(error);
        //   }
        // })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Loading group data...',
        success: 'Group data loaded',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
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
    toast.promise(leaveGroup(name), {
      pending: 'Leaving group...',
      success: 'You left the group',
      error: {
        render({ data }) {
          return data.response.data.error;
        },
      },
    });
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
          <Text size="1.5rem">Members:</Text>
          {/* <ul>
            {group.members.map((member) => (
              <li key={member._id}>{member.name}</li>
            ))}
          </ul> */}
          {isEmpty(scoresData)
            ? 'Loading member scores...'
            : scoresData?.map((score) => (
                <ListWrapper
                  key={score.user}
                  avatar={<HiOutlineUserGroup size="1.8rem" />}
                >
                  <Text>{`${score.user} : ${score.score} pts`}</Text>
                </ListWrapper>
              ))}
          <Button onClick={handleLeaveGroup}>Leave group</Button>
        </>
      )}
    </>
  );
}

export default GroupPage;
