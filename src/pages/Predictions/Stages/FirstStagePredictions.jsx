import styled from '@emotion/styled';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getGroupStage } from '../../../api/fixture';
import { getPredictionsByStage } from '../../../api/predictions';
import { Button, Form, Input } from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import Table from '../../../common/Table/Table';
import { getFlagUrl, parseDate } from '../../Fixture/fixturePageHelpers';
import { formatPredicitonsToPost } from '../predictionsPageUtils';

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
function GroupPredictions() {
  const [firstStageData, setFirstStageData] = useState([]); // Toda la data de la fase de grupos
  const [groupNumber, setGroupNumber] = useState(0); // 0 - A, 1 - B, 2 - C, 3 - D, 4 - E, 5 - F, 6 - G, 7 - H
  const [isLoading, setIsLoading] = useState(false);
  const [groupId] = useOutletContext();
  const [groupPredictions, setFirstStagePredictions] = useState([]);
  const { values, handleChange, resetForm } = useFormik({
    initialValues: {},
  });
  // TODO Ver como hacer para que se mantenga actualizado el groupId que viene por el router context.
  useEffect(() => {
    setIsLoading(true);
    getGroupStage() // Con la data de esta llamada armo las tablas.
      .then((res) => setFirstStageData(res.data.fixture))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    // Esta llamada sirve por si ya había hecho alguna predicción.
    // Stage 285063 es la fase de grupos.
    getPredictionsByStage(285063).then((res) => {
      setFirstStagePredictions(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    formatPredicitonsToPost(values, groupId);
    resetForm({ values: null });
  };

  const handleReset = () => {
    console.log('HANDLE RESET');
    resetForm({ values: null });
  };

  const handleNextGroup = () => {
    setGroupNumber((prevState) => prevState + 1);
    handleReset();
  };

  const handlePrevGroup = () => {
    setGroupNumber((prevState) => prevState - 1);
    handleReset();
  };

  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit} onReset={handleReset}>
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
                    <Input
                      type="number"
                      width="30px"
                      id={`${match.id}-away`}
                      value={values[`${match.id}-away`]}
                      name={`${match.id}-away`}
                      onChange={handleChange}
                    />
                  </Table.Cell>
                  {/* <Table.Cell>-</Table.Cell> */}
                  <Table.Cell padding="5px">
                    <Input
                      type="number"
                      width="30px"
                      name={`${match.id}-home`}
                      id={`${match.id}-home`}
                      value={values[`${match.id}-home`]}
                      onChange={handleChange}
                    />
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
      <Button type="submit">Enviar prediccion</Button>
      <ButtonWrapper>
        <Button
          grayscale
          onClick={handlePrevGroup}
          disabled={groupNumber === 0}
          type="reset"
        >
          Anterior
        </Button>
        <Button grayscale onClick={handleNextGroup} type="reset">
          Siguiente
        </Button>
      </ButtonWrapper>
    </Form>
  );
}

export default GroupPredictions;
