import React from 'react';
import { Text } from '../common.styles';

function Cell({ children }) {
  return (
    <td>
      <Text align="center">{children}</Text>
    </td>
  );
}

export { Cell };
