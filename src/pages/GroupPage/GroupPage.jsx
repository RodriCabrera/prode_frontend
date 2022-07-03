import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupData } from '../../api/groups';
import { Spinner } from '../../common/Spinner/Spinner';
import NotFound from '../NotFound';
import InGroup from './components/InGroup';
import NotInGroup from './components/NotInGroup';

function GroupPage() {
  const { name } = useParams();

  const [isUserInGroup, setIsUserInGroup] = useState(undefined);
  const [groupData, setGroupData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [groupExists, setGroupExists] = useState(true);

  const updateGroupData = () => {
    setIsUserInGroup(undefined);
    getGroupData(name)
      .then((res) => {
        setIsUserInGroup(true);
        setGroupData(res.data.groupData);
      })
      .catch((err) => {
        if (err.response.status === 401) setIsUserInGroup(false);
        if (err.response.status === 404) setGroupExists(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    updateGroupData();
  }, []);

  if (groupExists === false) return <NotFound />;
  if (isLoading || isUserInGroup === undefined) return <Spinner />;
  return isUserInGroup ? (
    <InGroup groupData={groupData} />
  ) : (
    <NotInGroup name={name} updater={updateGroupData} />
  );
}

export default GroupPage;
