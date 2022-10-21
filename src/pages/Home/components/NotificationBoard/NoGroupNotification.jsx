import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../../common/common.styles';

export function NoGroupNotification() {
  return (
    <>
      <Text weight="500" size="2rem" align="center">
        Empezá por crear o unirte a un grupo:
      </Text>
      <Text align="center" size="1.2rem">
        {' '}
        Desde <Link to="/groups/">esta sección</Link>
      </Text>
    </>
  );
}
