import React from 'react';
import Table from '../../common/Table/Table';
import { getFlagUrl, parseDate } from '../pagesHelpers';
import { parseMatchScore } from './fixturePageHelpers';

export function FixtureTable({ data, isCompact }) {
  return (
    <Table compact={isCompact}>
      <Table.Body>
        {data.map((match) => {
          return (
            <React.Fragment key={match.id}>
              <Table.Row>
                <Table.Cell
                  colSpan="5"
                  withBottomBorder
                  fontWeight="700"
                  fontSize="1.2rem"
                  padding={isCompact && '5px'}
                >
                  {parseDate(match.date)}
                </Table.Cell>
              </Table.Row>
              <Table.Row borderBottom="1px solid red">
                <Table.Cell padding={isCompact && '5px'}>
                  {getFlagUrl(match.away.flag, 1)}
                </Table.Cell>
                <Table.Cell fontWeight="800" padding={isCompact && '5px'}>
                  {match.away.shortName || '?'}
                </Table.Cell>
                <Table.Cell padding={isCompact && '5px'}>
                  {`${parseMatchScore(match.awayScore)}-${parseMatchScore(
                    match.homeScore
                  )}`}
                </Table.Cell>
                <Table.Cell fontWeight="800" padding={isCompact && '5px'}>
                  {match.home.shortName || '?'}
                </Table.Cell>
                <Table.Cell padding={isCompact && '5px'}>
                  {getFlagUrl(match.home.flag, 1)}
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
}
