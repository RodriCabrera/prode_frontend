import React from 'react';
import Table from '../../../common/Table/Table';
import { getFlagUrl, parseDate } from '../../pagesHelpers';
import { parseMatchScore } from '../fixturePageHelpers';

export function FixtureTable({ data, isCompact, fullWidth }) {
  return (
    <Table compact={isCompact} fullWidth={fullWidth}>
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
                  padding={isCompact && '10px'}
                >
                  {parseDate(match.date)}
                </Table.Cell>
              </Table.Row>
              <Table.Row borderBottom="1px solid red">
                <Table.Cell padding={isCompact && '10px'}>
                  {getFlagUrl(match.away.flag, 1)}
                </Table.Cell>
                <Table.Cell fontWeight="800" padding={isCompact && '10px'}>
                  {match.away.shortName || match.away}
                </Table.Cell>
                <Table.Cell padding={isCompact && '10px'}>
                  {`${parseMatchScore(match.awayScore)}-${parseMatchScore(
                    match.homeScore
                  )}`}
                </Table.Cell>
                <Table.Cell fontWeight="800" padding={isCompact && '10px'}>
                  {match.home.shortName || match.home}
                </Table.Cell>
                <Table.Cell padding={isCompact && '10px'}>
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
