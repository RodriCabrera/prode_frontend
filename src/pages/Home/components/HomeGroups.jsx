import { useEffect, useState } from "react";

import { getUserGroups } from "api/groups";
import { Text } from "common/common.styles";
import useCleanupController from "hooks/useCleanupController";

// ! TODO: COMPONENTE EN DESUSO
export function HomeGroups() {
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    getUserGroups(signal)
      .then((res) => setUserGroups(res.data))
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);
  if (isLoading) {
    return "";
  }
  if (userGroups.length !== 0) {
    return null;
  }
  return <Text>Podés empezar por crear o unirte a un grupo</Text>;
}
