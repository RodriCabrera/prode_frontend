import React from 'react';
import { Text } from '../common.styles';
import { TH } from './Table.styles';

function Header({ children }) {
  return (
    <TH>
      <Text weight="600">{children}</Text>
    </TH>
  );
}

export { Header };
