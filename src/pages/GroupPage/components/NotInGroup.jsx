import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import GroupRules from './GroupRules';
import { GoBackButton } from '../../../common/GoBackButton/GoBackButton';
import {
  CardContainer,
  Button,
  CardWrapper,
  CardTitle,
} from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import { getGroupRules, joinGroup } from '../../../api/groups';
import useCleanupController from '../../../hooks/useCleanupController';

function NotInGroup({ name, updater }) {
  const [isLoading, setIsLoading] = useState(false);
  const [groupRules, setGroupRules] = useState();
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    setIsLoading(true);
    getGroupRules(name, signal)
      .then((res) => {
        setGroupRules(res.data);
      })
      .catch(err => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);

  const handleJoin = () => {
    setIsLoading(true);
    toast.promise(
      joinGroup(name)
        .then(() => updater())
        .finally(() => setIsLoading(false)),
      {
        pending: 'Uniéndote al grupo...',
        success: 'Te has unido',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  if (isLoading) return <Spinner />;
  return (
    <CardContainer>
      <CardWrapper>
        <GoBackButton />
        <CardTitle size="2.5rem" align="center">
          {name}
        </CardTitle>
        {groupRules && <GroupRules rules={groupRules} />}
        <CardContainer>
          <Button onClick={handleJoin}>Unirse</Button>
        </CardContainer>
      </CardWrapper>
    </CardContainer>
  );
}

export default NotInGroup;
