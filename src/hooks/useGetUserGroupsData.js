import { useEffect, useState } from "react";
import { getUserGroups, getGroupData } from "../api/groups";
import useCleanupController from "./useCleanupController";

export const useGetUserGroupsData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userGroupList, setUserGroupList] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [selectedUserGroup, setSelectedUserGroup] = useState(null);
  const [signal, cleanup, handleCancel] = useCleanupController();

  const handleGroupSelect = (group) => {
    setSelectedUserGroup(group);
    getGroupData(group.name, signal)
      .then((res) => {
        setSelectedUserGroup(res.data.groupData);
        res.data && setIsNew(res.data.isNew);
      })
      .catch((err) => handleCancel(err));
  };

  useEffect(() => {
    setIsLoading(true);
    getUserGroups(signal)
      .then(({ data }) => {
        setUserGroupList(data);
        handleGroupSelect(data[0]);
        // setSelectedUserGroup(data[0]);
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
    isNew,
  };
};
