import styled from '@emotion/styled';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPredictions, getPredictions } from '../../../../api/predictions';
import { Button, Form, Input, Text } from '../../../../common/common.styles';
import { Spinner } from '../../../../common/Spinner/Spinner';
import Table from '../../../../common/Table/Table';
import ErrorInfo from '../../../../common/MoreInfo/ErrorInfo';
import { getFlagUrl, parseDate } from '../../../Fixture/fixturePageHelpers';
import {
  formatPredictionsToDisplay,
  formatPredictionsToPost,
  getErrorMessageForMatch,
  numberToGroupLetter,
} from '../../predictionsPageUtils';

function FirstStagePredictionsForm(props) {
  const { firstStageData, resultsMode } = props;
  const [selectedGroup] = useOutletContext();
  const [groupNumber, setGroupNumber] = useState(0); // 0 - A, 1 - B, etc.
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, resetForm } = useFormik({
    initialValues: {},
  });
  const [errorMessages, setErrorMessages] = useState([]);

  const updatePredictions = () => {
    setIsLoading(true);
    getPredictions(selectedGroup.id, 'GRUPOS')
      .then((res) => {
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
          setErrorMessages(res.data.errors);
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

  const checkPredictionResult = (homeOrAway, prediction, matchId) => {
    const matchResult = firstStageData[groupNumber].matches.find(
      (match) => match.id === matchId
    )[`${homeOrAway}Score`];
    return prediction === matchResult;
  };

  if (isLoading) return <Spinner />;

  return (
    <FormWrapper>
      <Text align="center" size="1.7rem" weight="600">
        {`GRUPO ${numberToGroupLetter(groupNumber)}`}
      </Text>
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
                      <ResultsInput
                        type="number"
                        width="30px"
                        min={0}
                        id={`${match.id}-away`}
                        value={values[`${match.id}-away`]}
                        name={`${match.id}-away`}
                        onChange={handleChange}
                        disabled={resultsMode}
                        userCorrectPrediction={
                          // segun esta propiedad se pinta el input en verde o rojo
                          resultsMode
                            ? checkPredictionResult(
                                'away',
                                values[`${match.id}-away`],
                                match.id
                              )
                            : ''
                        }
                      />
                    </Table.Cell>
                    {/* <Table.Cell>-</Table.Cell> */}
                    <Table.Cell padding="5px">
                      <ResultsInput
                        type="number"
                        width="30px"
                        min={0}
                        name={`${match.id}-home`}
                        id={`${match.id}-home`}
                        value={values[`${match.id}-home`]}
                        onChange={handleChange}
                        disabled={resultsMode}
                        userCorrectPrediction={
                          // segun esta propiedad se pinta el input en verde o rojo
                          // TODO: Agregar color para ganador adivinado.
                          resultsMode
                            ? checkPredictionResult(
                                'home',
                                values[`${match.id}-home`],
                                match.id
                              )
                            : ''
                        }
                      />
                    </Table.Cell>
                    <Table.Cell padding="5px" fontWeight="800">
                      {match.home.shortName || '?'}
                    </Table.Cell>
                    <Table.Cell padding="0">
                      {getFlagUrl(match.home.flag, 1)}
                    </Table.Cell>
                    <ErrorInfo
                      info={getErrorMessageForMatch(errorMessages, match.id)}
                    />
                  </Table.Row>
                </>
              );
            })}
          </Table.Body>
        </Table>
        {!resultsMode && (
          <Button type="submit" disabled={!selectedGroup?.id}>
            {selectedGroup?.id ? 'Enviar prediccion' : 'Seleccione un grupo'}
          </Button>
        )}
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
const ResultsInput = styled(Input)`
  :disabled {
    background-color: ${({ userCorrectPrediction }) =>
      userCorrectPrediction ? 'lightgreen' : '#fd5e53'};
  }
`;

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
export default FirstStagePredictionsForm;
