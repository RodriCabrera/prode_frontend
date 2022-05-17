import React from 'react';
import { Body } from './Body';
import { Cell } from './Cell';
import { Head } from './Head';
import { Header } from './Header';
import { Row } from './Row';
import { Container, TableWrapper } from './Table.styles';

function Table({ children }) {
  return (
    <Container>
      <TableWrapper>{children}</TableWrapper>;
    </Container>
  );
}

Table.Body = Body;
Table.Cell = Cell;
Table.Head = Head;
Table.Header = Header;
Table.Row = Row;

export default Table;
