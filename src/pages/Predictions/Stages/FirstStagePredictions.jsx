import React, { useEffect, useState } from 'react';
import { getGroupStage } from '../../../api/fixture';
import { Form, Input } from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import Table from '../../../common/Table/Table';
import { getFlagUrl, parseDate } from '../../Fixture/fixturePageHelpers';

function GroupPredictions() {
  const [firstStage, setFirstStage] = useState([]);
  const [groupNumber, setGroupNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getGroupStage()
      .then((res) => setFirstStage(res.data.fixture))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Spinner />;

  console.log(firstStage);
  // a la fixture table se le mandan los matches
  return (
    <Form>
      <Table>
        <Table.Body>
          {firstStage[groupNumber]?.matches.map((match) => {
            return (
              <>
                <Table.Row>
                  <Table.Cell
                    colSpan="6"
                    withBottomBorder
                    fontWeight="500"
                    fontSize="1.2rem"
                    padding="5px"
                  >
                    {parseDate(match.date)}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell padding="0">
                    {getFlagUrl(match.away.flag, 1)}
                  </Table.Cell>
                  <Table.Cell padding="5px" fontWeight="800">
                    {match.away.shortName || '?'}
                  </Table.Cell>
                  <Table.Cell padding="5px">
                    <Input type="number" width="30px" />
                  </Table.Cell>
                  {/* <Table.Cell>-</Table.Cell> */}
                  <Table.Cell padding="5px">
                    <Input type="number" width="30px" />
                  </Table.Cell>
                  <Table.Cell padding="5px" fontWeight="800">
                    {match.home.shortName || '?'}
                  </Table.Cell>
                  <Table.Cell padding="0">
                    {getFlagUrl(match.home.flag, 1)}
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>
      </Table>
    </Form>
  );
}

export default GroupPredictions;
