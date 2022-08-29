import { useEffect, useState } from 'react';
import { getUserGroups } from '../api/groups';
import useCleanupController from './useCleanupController';

export const useGetUserGroupsData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userGroupList, setUserGroupList] = useState([]);
  const [selectedUserGroup, setSelectedUserGroup] = useState(null);
  const [signal, cleanup, handleCancel] = useCleanupController();

  const handleGroupSelect = (group) => {
    setSelectedUserGroup(group);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserGroups(signal)
      .then(({ data }) => {
        setUserGroupList(data);
        setSelectedUserGroup(data[0]);
      })
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);

  return {
    userGroupList,
    selectedUserGroup,
    handleGroupSelect,
    isLoadingUserGroupsData: isLoading,
  };
};
