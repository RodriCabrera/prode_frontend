/* eslint-disable react/forbid-prop-types */
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MdOutlineChevronRight, MdOutlineChevronLeft } from 'react-icons/md';
import { Button, Form, Input, Text } from '../../common/common.styles';
import ErrorInfo from '../../common/MoreInfo/ErrorInfo';
import Table from '../../common/Table/Table';
import { getFlagUrl } from '../pagesHelpers';
import { FormButtonWrapper, FormWrapper } from './Predictions.styles';
import {
  checkPredictionResult,
  getErrorMessageForMatch,
  numberToGroupLetter,
  groupNumberMod,
} from './predictionsPageUtils';

// TODO: Para dehabilitar inputs si se pasó la fecha:
// Si Date.now es mayor a la fecha del partido menos el time limit ya no podes hacer predicciones.
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
    groupPhase,
  } = props;

  const [data, setData] = useState(stageData);
  const { selectedUserGroup, mode } = useOutletContext();
  const resultsMode = mode === 'results';

  useEffect(() => {
    if (stageData.length > 0) {
      if (typeof groupNumber === 'number') {
        setData(stageData[groupNumberMod(groupNumber)]?.matches);
      }
    }
  }, [stageData]);

  const calculateCanPredict = (matchDate) => {
    const now = Date.now();
    const timeLimit = parseInt(selectedUserGroup.rules.timeLimit, 10) || 0;
    const matchTime = new Date(matchDate).getTime();
    return now + timeLimit < matchTime;
  };

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
                match.status === 0
                  ? checkPredictionResult(
                      data,
                      groupNumberMod(groupNumber),
                      match.id,
                      'away',
                      values[`${match.id}-away`],
                      values[`${match.id}-home`]
                    )
                  : 'silver';
              const matchResultString = `Resultado: ${match.away?.shortName} ${match.awayScore}-${match.homeScore} ${match.home?.shortName}`;
              const canPredict = calculateCanPredict(match.date);

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
                      {match.away?.shortName || match.away}
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
                        disabled={resultsMode || !canPredict}
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
                        disabled={resultsMode || !canPredict}
                        predictionStatus={
                          resultsMode ? predictionStatus('home') : ''
                        }
                      />
                    </Table.Cell>
                    <Table.Cell padding="5px" fontWeight="800">
                      {match.home?.shortName || match.home}
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
          <Button type="submit" disabled={!selectedUserGroup?.id}>
            {selectedUserGroup?.id
              ? 'Enviar prediccion'
              : 'Seleccione un grupo'}
          </Button>
        )}
        {groupPhase && (
          <FormButtonWrapper>
            <Button
              grayscale
              onClick={handlePrevGroup}
              // disabled={groupNumber === 0}
              type="reset"
              width="100%"
            >
              <MdOutlineChevronLeft size={26} />
              {stageData[groupNumberMod(groupNumber - 1)]?.name}
            </Button>
            <Button
              grayscale
              onClick={handleNextGroup}
              type="reset"
              width="100%"
            >
              {stageData[groupNumberMod(groupNumber + 1)]?.name}
              <MdOutlineChevronRight size={26} />
            </Button>
          </FormButtonWrapper>
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
