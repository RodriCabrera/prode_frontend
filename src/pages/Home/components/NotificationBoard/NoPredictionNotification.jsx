import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../../common/common.styles';

export function NoPredictionNotification() {
  return (
    <>
      <Text>Aún no hiciste ninguna predicción.</Text>
      <Text>
        {' '}
        Hacelo desde <Link to="/predictions/edit?mode=edit">esta sección</Link>
      </Text>
    </>
  );
}
