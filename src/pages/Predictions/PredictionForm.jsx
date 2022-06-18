/* eslint-disable react/forbid-prop-types */
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button, Form, Input, Text } from '../../common/common.styles';
import ErrorInfo from '../../common/MoreInfo/ErrorInfo';
import Table from '../../common/Table/Table';
import { getFlagUrl, parseDate } from '../pagesHelpers';
import {
  checkPredictionResult,
  getErrorMessageForMatch,
  numberToGroupLetter,
  groupNumberMod,
} from './predictionsPageUtils';

export function PredictionForm(props) {
  const {
    stageData,
    groupNumber,
    values,
    handleChange,
    handleSubmit,
    handleNextGroup,
    handlePrevGroup,
    errorMessages,
    resultsMode,
    groupPhase,
  } = props;

  const [selectedGroup] = useOutletContext();
  const [data, setData] = useState(stageData);

  useEffect(() => {
    if (stageData.length > 0) {
      if (typeof groupNumber === 'number') {
        setData(stageData[groupNumberMod(groupNumber)]?.matches);
      }
    }
  }, [stageData]);

  // TODO: Arreglar formato de la lista con el error info (queda corrida)
  // ? Eliminar los horarios o disponerlos una sóla vez por fecha? Ordenarlos ascendentemente?
  return (
    <FormWrapper id="prediction-form-wrapper">
      <Text align="center" size="1.7rem" weight="600">
        {typeof groupNumber === 'number' &&
          `GRUPO ${numberToGroupLetter(groupNumber)}`}
      </Text>
      <Form id="prediction-form" onSubmit={handleSubmit}>
        <Table id="prediction-table">
          <Table.Body>
            {data?.map((match) => {
              const predictionStatus = () =>
                checkPredictionResult(
                  data,
                  groupNumberMod(groupNumber),
                  match.id,
                  'away',
                  values[`${match.id}-away`],
                  values[`${match.id}-home`]
                );
              const matchResultString = `Resultado: ${match.away?.shortName} ${match.awayScore}-${match.homeScore} ${match.home?.shortName}`;

              const renderInfoIcon = () => {
                if (resultsMode) {
                  if (
                    predictionStatus() === 'silver' ||
                    predictionStatus() === 'lightgreen'
                  )
                    return '-';

                  if (predictionStatus() === '#FFFF66')
                    return (
                      <ErrorInfo
                        color={predictionStatus()}
                        info={matchResultString}
                      />
                    );

                  if (predictionStatus() === 'tomato')
                    return (
                      <ErrorInfo
                        color={predictionStatus()}
                        info={matchResultString}
                      />
                    );
                }
                return null;
              };
              return (
                <React.Fragment key={match.id}>
                  <Table.Row>
                    {/* <Table.Cell
                      colSpan="6"
                      withBottomBorder
                      fontWeight="500"
                      fontSize="1.2rem"
                      padding="5px"
                    >
                      {parseDate(match.date)}
                    </Table.Cell> */}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell padding="1rem 0" margin="0 0 0 1rem">
                      {getFlagUrl(match.away?.flag, 1)}
                    </Table.Cell>
                    <Table.Cell padding="5px" fontWeight="800">
                      {match.away?.shortName || '?'}
                    </Table.Cell>
                    <Table.Cell padding="5px">
                      <ResultsInput
                        type="number"
                        width="30px"
                        min={0}
                        align="center"
                        id={`${match.id}-away`}
                        value={values[`${match.id}-away`]}
                        name={`${match.id}-away`}
                        onChange={handleChange}
                        disabled={resultsMode}
                        predictionStatus={
                          resultsMode ? predictionStatus('away') : ''
                        }
                      />
                    </Table.Cell>
                    <Table.Cell padding="0">
                      {resultsMode ? (
                        renderInfoIcon()
                      ) : (
                        <ErrorInfo
                          info={getErrorMessageForMatch(
                            errorMessages,
                            match.id
                          )}
                        />
                      )}
                    </Table.Cell>
                    <Table.Cell padding="5px">
                      <ResultsInput
                        type="number"
                        width="30px"
                        min={0}
                        align="center"
                        name={`${match.id}-home`}
                        id={`${match.id}-home`}
                        value={values[`${match.id}-home`]}
                        onChange={handleChange}
                        disabled={resultsMode}
                        predictionStatus={
                          resultsMode ? predictionStatus('home') : ''
                        }
                      />
                    </Table.Cell>
                    <Table.Cell padding="5px" fontWeight="800">
                      {match.home?.shortName || '?'}
                    </Table.Cell>
                    <Table.Cell padding="1rem 0" margin="0 1rem 0 0">
                      {getFlagUrl(match.home?.flag, 1)}
                    </Table.Cell>
                  </Table.Row>
                </React.Fragment>
              );
            })}
          </Table.Body>
        </Table>
        {!resultsMode && (
          <Button type="submit" disabled={!selectedGroup?.id}>
            {selectedGroup?.id ? 'Enviar prediccion' : 'Seleccione un grupo'}
          </Button>
        )}
        {groupPhase && (
          <ButtonWrapper>
            <Button
              grayscale
              onClick={handlePrevGroup}
              // disabled={groupNumber === 0}
              type="reset"
              width="100%"
            >
              <span className="material-symbols-outlined">chevron_left</span>
              {stageData[groupNumberMod(groupNumber - 1)]?.name}
            </Button>
            <Button
              grayscale
              onClick={handleNextGroup}
              type="reset"
              width="100%"
            >
              {stageData[groupNumberMod(groupNumber + 1)]?.name}
              <span className="material-symbols-outlined">chevron_right</span>
            </Button>
          </ButtonWrapper>
        )}
      </Form>
    </FormWrapper>
  );
}
const ResultsInput = styled(Input)`
  :disabled {
    background-color: ${({ predictionStatus }) => predictionStatus};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

PredictionForm.propTypes = {
  stageData: PropTypes.array.isRequired,
  groupNumber: PropTypes.number,
  // values: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleNextGroup: PropTypes.func,
  handlePrevGroup: PropTypes.func,
  // errorMessages: PropTypes.object,
  resultsMode: PropTypes.bool,
};
