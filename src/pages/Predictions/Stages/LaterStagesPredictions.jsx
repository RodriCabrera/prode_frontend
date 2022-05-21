import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFixture } from '../../../api/fixture';
import { Form, Input } from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import Table from '../../../common/Table/Table';
import { getFlagUrl, parseDate } from '../../Fixture/fixturePageHelpers';
import { getStageId } from '../../Fixture/fixturePageUtils';

function LaterPredictions() {
  const { stage } = useParams();
  const [fixture, setFixture] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFixture(null, getStageId(stage))
      .then((res) => setFixture(res.data.fixture))
      .catch((err) => toast.error(err.response.data.error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <Table>
        <Table.Body>
          {fixture.map((match) => {
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

export default LaterPredictions;
