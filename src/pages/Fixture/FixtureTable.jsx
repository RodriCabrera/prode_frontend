import React from 'react';
import Table from '../../common/Table/Table';

function FixtureTable({ data }) {
  console.log('data', data);
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Header</Table.Header>
          <Table.Header>Header2</Table.Header>
          <Table.Header>Header3</Table.Header>
          <Table.Header>Header4</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default FixtureTable;
