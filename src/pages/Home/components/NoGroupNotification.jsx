import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../common/common.styles';

export function NoGroupNotification() {
  return (
    <Text weight="500" align="center">
      Empezá por crear o unirte a un grupo: <Link to="/groups">Aca</Link>
    </Text>
  );
}
