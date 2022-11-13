import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getGroupData } from "../../api/groups";
import { Spinner } from "../../common/Spinner/Spinner";
import NotFound from "../NotFound";
import InGroup from "./components/InGroup";
import NotInGroup from "./components/NotInGroup";
import useCleanupController from "../../hooks/useCleanupController";
import ExtraPredictions from "./components/ExtraPredictions";

function GroupPage() {
  const { name } = useParams();
  const extra = new URLSearchParams(window.location.search).get("extra")

  const [isUserInGroup, setIsUserInGroup] = useState(undefined);
  const [groupData, setGroupData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [groupExists, setGroupExists] = useState(true);
  const [signal, cleanup, handleCancel] = useCleanupController();

  const updateGroupData = (newName=null) => {
    setIsUserInGroup(undefined);
    getGroupData(newName || name, signal)
      .then((res) => {
        setIsUserInGroup(true);
        setGroupData(res.data.groupData);
      })
      .catch((err) => {
        if (handleCancel(err)) return;
        if (err.response.status === 401) setIsUserInGroup(false);
        if (err.response.status === 404) setGroupExists(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    updateGroupData();
    return cleanup;
  }, []);

  if (groupExists === false) return <NotFound />;
  if (isLoading || isUserInGroup === undefined) return <Spinner />;
  return isUserInGroup ? (
    (extra && groupData.extraPredictions) ? <ExtraPredictions groupData={groupData} /> : <InGroup groupData={groupData} updater={updateGroupData} />
  ) : (
    <NotInGroup name={name} updater={updateGroupData} />
  );
}

export default GroupPage;
