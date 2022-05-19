import React from 'react';
import { Text } from '../common.styles';
import { TD } from './Table.styles';

function Cell({ children, ...props }) {
  const { borderRight } = props;
  return (
    <TD borderRight={borderRight}>
      <Text align="center">{children}</Text>
    </TD>
  );
}

export { Cell };
