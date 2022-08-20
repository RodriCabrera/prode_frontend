import React from 'react';
import { Text } from '../common.styles';
import { TD } from './Table.styles';

function Cell({ children, ...props }) {
  const {
    borderBottom,
    colSpan,
    fontSize,
    fontWeight,
    withBottomBorder,
    padding,
    margin,
  } = props;
  return (
    <TD
      borderBottom={borderBottom}
      colSpan={colSpan}
      padding={padding}
      align="center"
      size={fontSize}
      weight={fontWeight}
      withBottomBorder={withBottomBorder}
      margin={margin}>
      {children}
    </TD>
  );
}

export { Cell };
