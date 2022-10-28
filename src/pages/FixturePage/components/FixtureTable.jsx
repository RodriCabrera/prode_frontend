import React from "react";
import styled from "@emotion/styled";

import Table from "../../../common/Table/Table";
import { getFlagUrl, parseDate } from "../../pagesHelpers";
import { parseMatchScore, datePreferences } from "../fixturePageHelpers";

const FlagCell = styled(Table.Cell)`
  min-width: 42px;
  min-height: 28px;
  background-color: red;
`;

const FixtureTable = ({ data, isCompact, fullWidth, isMobile }) => {
  return (
    <Table compact={isCompact} fullWidth={fullWidth}>
      <Table.Body>
        {data.map((match) => {
          return (
            <React.Fragment key={match.id}>
              <Table.Row>
                {!isMobile && (
                  <Table.Cell
                    colSpan="5"
                    withBottomBorder
                    fontWeight="700"
                    fontSize="1.2rem"
                    padding={isCompact && "10px"}
                  >
                    {parseDate(match.date, datePreferences)}
                  </Table.Cell>
                )}
              </Table.Row>
              <Table.Row borderBottom="1px solid red">
                <FlagCell padding={isCompact && "10px"}>
                  {getFlagUrl(match.away.flag, 1)}
                </FlagCell>
                <Table.Cell fontWeight="800" padding={isCompact && "10px"}>
                  {match.away.shortName || match.away}
                </Table.Cell>
                <Table.Cell padding={isCompact && "10px"}>
                  {`${parseMatchScore(match.awayScore)}-${parseMatchScore(
                    match.homeScore
                  )}`}
                </Table.Cell>
                <Table.Cell fontWeight="800" padding={isCompact && "10px"}>
                  {match.home.shortName || match.home}
                </Table.Cell>
                <FlagCell padding={isCompact && "10px"}>
                  {getFlagUrl(match.home.flag, 1)}
                </FlagCell>
              </Table.Row>
            </React.Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default FixtureTable;
