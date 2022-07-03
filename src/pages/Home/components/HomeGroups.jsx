import { useEffect, useState } from 'react';
import { getUserGroups } from '../../../api/groups';
import { Text } from '../../../common/common.styles';

export function HomeGroups() {
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserGroups()
      .then((res) => setUserGroups(res.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return '';
  }
  if (userGroups.length !== 0) {
    return null;
  }
  return <Text>Podés empezar por crear o unirte a un grupo</Text>;
}
