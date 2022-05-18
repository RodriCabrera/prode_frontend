import React from 'react';
import Table from '../../common/Table/Table';

function FixtureTable({ data }) {
  console.log('data en fixture table', data);
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Fecha</Table.Header>
          <Table.Header>ad</Table.Header>
          <Table.Header>display</Table.Header>
          <Table.Header>ds</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          {/* <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell> */}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default FixtureTable;
