import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../../common/common.styles';

export function NoPredictionNotification() {
  return (
    <>
      <Text size="2rem">Aún no hiciste ninguna predicción.</Text>
      <Text>
        {' '}
        Hacelas desde <Link to="/predictions/">esta sección</Link>
      </Text>
    </>
  );
}
