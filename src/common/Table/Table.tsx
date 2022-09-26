import React, { FC } from "react";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Head } from "./Head";
import { Header } from "./Header";
import { Row } from "./Row";
import { Container, TableWrapper } from "./Table.styles";

interface ITable extends FC {
  fullWidth: boolean;
  children: JSX.Element;
}
function Table({ fullWidth, children }: ITable) {
  return (
    <Container>
      <TableWrapper fullWidth={fullWidth}>{children}</TableWrapper>
    </Container>
  );
}

Table.Body = Body;
Table.Cell = Cell;
Table.Head = Head;
Table.Header = Header;
Table.Row = Row;

export default Table;
