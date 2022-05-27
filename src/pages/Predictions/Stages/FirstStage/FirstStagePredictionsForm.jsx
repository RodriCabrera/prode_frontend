import styled from '@emotion/styled';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPredictions, getPredictions } from '../../../../api/predictions';
import { Button, Form, Input } from '../../../../common/common.styles';
import { Spinner } from '../../../../common/Spinner/Spinner';
import Table from '../../../../common/Table/Table';
import { getFlagUrl, parseDate } from '../../../Fixture/fixturePageHelpers';
import {
  formatPredictionsToDisplay,
  formatPredictionsToPost,
} from '../../predictionsPageUtils';

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function FirstStagePredictionsForm(props) {
  const { firstStageData } = props;
  const [selectedGroup] = useOutletContext();
  const [groupNumber, setGroupNumber] = useState(0); // 0 - A, 1 - B, 2 - C, 3 - D, 4 - E, 5 - F, 6 - G, 7 - H
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, resetForm } = useFormik({
    initialValues: {},
  });

  const updatePredictions = () => {
    setIsLoading(true);
    getPredictions(selectedGroup.id, 'GRUPOS')
      .then((res) => {
        console.log('FORMATEADO:', formatPredictionsToDisplay(res.data));
        // setFirstStagePredictions(formatPredictionsToDisplay(res.data));
        resetForm({ values: formatPredictionsToDisplay(res.data) });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (firstStageData.length > 0) {
      updatePredictions();
    }
  }, [firstStageData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(
      createPredictions(formatPredictionsToPost(values, selectedGroup.id))
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          setIsLoading(false);
          updatePredictions();
        }),
      {
        pending: 'Enviando predicciones...',
        success: 'Predicciones enviadas con éxito',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const handleNextGroup = () => {
    setGroupNumber((prevState) => prevState + 1);
    updatePredictions();
  };

  const handlePrevGroup = () => {
    setGroupNumber((prevState) => prevState - 1);
    updatePredictions();
  };

  if (isLoading) return <Spinner />;

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
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
                        min={0}
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
                        min={0}
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
        <Button type="submit" disabled={!selectedGroup?.id}>
          {selectedGroup?.id ? 'Enviar prediccion' : 'Seleccione un grupo'}
        </Button>
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
    </FormWrapper>
  );
}

export default FirstStagePredictionsForm;
