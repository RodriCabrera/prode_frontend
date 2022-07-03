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

function NotInGroup({ name, updater }) {
  const [isLoading, setIsLoading] = useState(false);
  const [groupRules, setGroupRules] = useState();

  useEffect(() => {
    setIsLoading(true);
    getGroupRules(name)
      .then((res) => {
        setGroupRules(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
