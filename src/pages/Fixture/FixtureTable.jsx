import React from 'react';
import Table from '../../common/Table/Table';
import { getFlagUrl, parseDate } from '../pagesHelpers';
import { parseMatchScore } from './fixturePageHelpers';

function FixtureTable({ data }) {
  return (
    <Table>
      <Table.Body>
        {data.map((match) => {
          return (
            <>
              <Table.Row>
                <Table.Cell
                  colSpan="5"
                  withBottomBorder
                  fontWeight="700"
                  fontSize="1.2rem"
                >
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
