import React from 'react';
import Table from '../../common/Table/Table';
import { getFlagUrl, parseDate, parseMatchScore } from './fixturePageHelpers';

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
            <>
              <Table.Row>
                <Table.Cell colSpan="5" withBottomBorder>
                  {parseDate(match.date)}
                </Table.Cell>
              </Table.Row>
              <Table.Row borderBottom="1px solid red">
                <Table.Cell>{getFlagUrl(match.away.flag, 1)}</Table.Cell>
                <Table.Cell fontWeight="800">
                  {match.away.shortName || '?'}
                </Table.Cell>
                <Table.Cell>
                  {`${parseMatchScore(match.awayScore)} - ${parseMatchScore(
                    match.homeScore
                  )}`}
                </Table.Cell>
                <Table.Cell fontWeight="800">
                  {match.home.shortName || '?'}
                </Table.Cell>
                <Table.Cell>{getFlagUrl(match.home.flag, 1)}</Table.Cell>
              </Table.Row>
            </>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default FixtureTable;
