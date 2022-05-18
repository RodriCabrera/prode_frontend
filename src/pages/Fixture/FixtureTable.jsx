import React from 'react';
import Table from '../../common/Table/Table';
import { getFlagUrl } from './fixturePageUtils';

function FixtureTable({ data }) {
  console.log('data en fixture table', data);
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header />
          <Table.Header />
          <Table.Header />
          <Table.Header />
          <Table.Header />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map((match) => {
          return (
            <Table.Row>
              <Table.Cell borderRight="1px solid white">
                {new Date(match.date).toUTCString()}
              </Table.Cell>
              <Table.Cell>{getFlagUrl(match.away.flag, 1)}</Table.Cell>
              <Table.Cell>{match.away.shortName || '?'}</Table.Cell>
              <Table.Cell>
                {`${match.awayScore || ''} - ${match.homeScore || ''}`}
              </Table.Cell>
              <Table.Cell>{match.home.shortName || '?'}</Table.Cell>
              <Table.Cell>{getFlagUrl(match.home.flag, 1)}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default FixtureTable;
