import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { UserMiniAvatar } from '../../common/UserMiniAvatar/UserMiniAvatar';
import { getGroupScores } from '../../api/groups';
import { ListElement } from '../../common/Lists/ListElement';
import { Spinner } from '../../common/Spinner/Spinner';
import {
  Text,
  CardContainer,
  Button,
  CardWrapper,
  CardTitle,
} from '../../common/common.styles';
import LeaveGroupForm from '../Groups/components/LeaveGroupForm';
import { AuthContext } from '../../common/AuthProvider';

function GroupPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [groupScoresData, setGroupScoresData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const userContext = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getGroupScores(name)
      .then((res) => {
        setGroupScoresData(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onGroupExit = () => {
    navigate('/groups');
  };

  const handleUserClick = (user) => {
    if (user === userContext.user.name) return navigate('/profile/');
    return navigate(`/profile/${user}`);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {groupScoresData.group && (
        <CardContainer>
          <CardWrapper>
            <CardTitle size="2.5rem" align="center">
              {name}
            </CardTitle>
            <Text size="1.5rem">Admin: {groupScoresData.group.owner}</Text>
            <Text size="1.5rem">Miembros del grupo:</Text>
            {isEmpty(groupScoresData)
              ? 'Loading member scores...'
              : groupScoresData.scores?.map((score) => (
                  <ListElement
                    onClick={() => handleUserClick(score.user)}
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
          </CardWrapper>
        </CardContainer>
      )}
    </>
  );
}

export default GroupPage;
