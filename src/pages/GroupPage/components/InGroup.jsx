import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { UserMiniAvatar } from '../../../common/UserMiniAvatar/UserMiniAvatar';
import { getGroupScores } from '../../../api/groups';
import { ListElement } from '../../../common/Lists/ListElement';
import { Spinner } from '../../../common/Spinner/Spinner';
import useToggleModal from '../../../hooks/useToggleModal';
import Modal from '../../../common/Modal/Modal';
import {
  Text,
  CardContainer,
  Button,
  CardTitle,
  CardWrapper,
} from '../../../common/common.styles';
import LeaveGroupForm from './LeaveGroupForm';
import GroupRules from './GroupRules';
import GroupInvite from './GroupInvite';
import { AuthContext } from '../../../common/AuthProvider';
import { GoBackButton } from '../../../common/GoBackButton/GoBackButton';
import useCleanupController from '../../../hooks/useCleanupController';
import { useIsMobile } from '../../../hooks/useIsMobile';

function InGroup({ groupData }) {
  const navigate = useNavigate();
  const [groupScoresData, setGroupScoresData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showModal, toggleModal } = useToggleModal();
  const userContext = useContext(AuthContext);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsLoading(true);
    if (!groupData.name) return;
    getGroupScores(groupData.name, signal)
      .then((res) => {
        setGroupScoresData(res.data);
      })
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);

  const onGroupExit = () => {
    navigate('/groups');
  };

  const handleUserClick = (user) => {
    if (user === userContext.user.name) return navigate('/profile/');
    return navigate(`/profile/${user}`);
  };

  return (
    <CardContainer>
      <CardWrapper border="none" isMobile={true}>
        <GoBackButton />
        <Text size="2.5rem" align="center" weight="800">
          {groupData?.name}
        </Text>
        <GroupRules rules={groupData?.rules} />
        {isLoading && <Spinner />}
        {groupScoresData.group && (
          <>
            <Text size="1.2rem" weight="600" withBottomBorder>
              Miembros del grupo:
            </Text>
            <Text size=".8rem" weight={100}>
              (👑 es admin)
            </Text>
            {isEmpty(groupScoresData)
              ? 'Loading member scores...'
              : groupScoresData.scores?.map((score) => {
                  const isAdmin = score.user === groupScoresData.group.owner;
                  return (
                    <ListElement
                      onClick={() => handleUserClick(score.user)}
                      key={score.user}
                      avatar={
                        <UserMiniAvatar
                          avatar={score.avatar}
                          name={score.user}
                        />
                      }
                      isMobile={isMobile}
                    >
                      <Text>{`${isAdmin ? '👑' : ''} ${score.user} : ${
                        score.score
                      } pts`}</Text>
                    </ListElement>
                  );
                })}
            <GroupInvite />
            <CardContainer>
              <Button grayscale onClick={toggleModal}>
                Salir del grupo?
              </Button>
            </CardContainer>
            <Modal show={showModal} toggle={toggleModal}>
              <LeaveGroupForm updater={onGroupExit} />
            </Modal>
          </>
        )}
      </CardWrapper>
    </CardContainer>
  );
}

export default InGroup;
