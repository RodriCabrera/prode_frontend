import React from 'react';
import { Text } from '../common.styles';
import { TD } from './Table.styles';

function Cell({ children, ...props }) {
  const { borderBottom, colSpan, fontSize, fontWeight, withBottomBorder } =
    props;
  return (
    <TD borderBottom={borderBottom} colSpan={colSpan}>
      <Text
        align="center"
        size={fontSize}
        weight={fontWeight}
        withBottomBorder={withBottomBorder}
      >
        {children}
      </Text>
    </TD>
  );
}

export { Cell };
