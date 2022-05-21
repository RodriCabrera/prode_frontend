import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getGroupStage } from '../../../api/fixture';
import { Button, Form, Input } from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import Table from '../../../common/Table/Table';
import { getFlagUrl, parseDate } from '../../Fixture/fixturePageHelpers';
import { getPredictions } from '../../../api/predictions';

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
function GroupPredictions() {
  const [firstStageData, setFirstStageData] = useState([]); // Toda la data de la fase de grupos
  const [groupNumber, setGroupNumber] = useState(0); // 0 - A, 1 - B, 2 - C, 3 - D, 4 - E, 5 - F, 6 - G, 7 - H
  const [isLoading, setIsLoading] = useState(false);
  const [groupPredictions, setGroupPredictions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getGroupStage() // TODO: La llamada deberia ser a predictions, por si ya hay algo rellenado. O para volver de grupo.
      .then((res) => setFirstStageData(res.data.fixture))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    getPredictions(firstStageData[groupNumber]?.id)
      .then((res) => {
        setGroupPredictions(res.data);
      })
      .catch((err) => toast.error(err.response.data.error));
  }, []);

  console.log('groupPredictions', groupPredictions);
  if (isLoading) return <Spinner />;

  console.log(firstStageData);

  const handleNextGroup = () => {
    setGroupNumber((prevState) => prevState + 1);
  };
  const handlePrevGroup = () => {
    setGroupNumber((prevState) => prevState - 1);
  };

  return (
    <>
      <Form>
        <Table>
          <Table.Body>
            {firstStageData[groupNumber]?.matches.map((match) => {
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
      <ButtonWrapper>
        <Button
          grayscale
          onClick={handlePrevGroup}
          disabled={groupNumber === 0}
        >
          Anterior
        </Button>
        <Button grayscale onClick={handleNextGroup}>
          Siguiente
        </Button>
      </ButtonWrapper>
    </>
  );
}

export default GroupPredictions;
