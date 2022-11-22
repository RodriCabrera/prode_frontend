import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { CgMediaLive } from "react-icons/cg";

import Table from "../../../common/Table/Table";
import { getFlagUrl, parseDate } from "../../pagesHelpers";
import { parseMatchScore, datePreferences } from "../fixturePageHelpers";
import { Text } from "../../../common/common.styles";

const FlagCell = styled(Table.Cell)`
  min-width: 42px;
  min-height: 28px;
  background-color: red;
`;

const isLive = (match) => (match.status === 3 ? "red" : null);

const FixtureTable = ({ data, isCompact, fullWidth, isMobile }) => {
  const { t } = useTranslation();
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
                    {isLive(match) ? (
                      <Text align="center" color="red">
                        <CgMediaLive size={15} className="pulser" />{" "}
                        {t("live").toUpperCase()}
                      </Text>
                    ) : (
                      parseDate(match.date, datePreferences)
                    )}
                  </Table.Cell>
                )}
              </Table.Row>
              <Table.Row borderBottom="1px solid red">
                <FlagCell padding={isCompact && "10px"}>
                  {getFlagUrl(match.away.flag, 1)}
                </FlagCell>
                <Table.Cell fontWeight="800" padding={isCompact && "10px"}>
                  <Text align="center" color={isLive(match)}>
                    {match.away.shortName || match.away}
                  </Text>
                </Table.Cell>
                <Table.Cell padding={isCompact && "10px"}>
                  <Text align="center" color={isLive(match)}>
                    {`${parseMatchScore(match.awayScore)}-${parseMatchScore(
                      match.homeScore
                    )}`}
                  </Text>
                </Table.Cell>
                <Table.Cell fontWeight="800" padding={isCompact && "10px"}>
                  <Text align="center" color={isLive(match)}>
                    {match.home.shortName || match.home}
                  </Text>
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
