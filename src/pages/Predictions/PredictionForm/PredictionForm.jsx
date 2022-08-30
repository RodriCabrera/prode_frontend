import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button, Form, Input, Text } from '../../../common/common.styles';
import ErrorInfo from '../../../common/MoreInfo/ErrorInfo';
import Table from '../../../common/Table/Table';
import { getFlagUrl } from '../../pagesHelpers';
import { FormWrapper } from '../Predictions.styles';
import {
  checkPredictionResult,
  getErrorMessageForMatch,
  numberToGroupLetter,
  groupNumberMod,
  calculateIfCanPredict,
  formatInputDisplayValue,
} from '../predictionsPageUtils';
import { useIsMobile } from '../../../hooks/useIsMobile';

const useGetGroupStageData = ({ stageData, groupNumber }) => {
  const [data, setData] = useState(stageData);
  useEffect(() => {
    if (stageData.length > 0) {
      if (typeof groupNumber === 'number') {
        setData(stageData[groupNumberMod(groupNumber)]?.matches);
      }
    }
  }, [stageData]);
  return data;
};

export function PredictionForm(props) {
  const {
    stageData,
    groupNumber,
    values,
    handleChange,
    handleSubmit,
    errorMessages,
    dirty,
  } = props;

  const data = useGetGroupStageData({ stageData, groupNumber });

  const GroupTitle = () => {
    return (
      <Text align="center" size="1.7rem" weight="600">
        {typeof groupNumber === 'number' &&
          `GRUPO ${numberToGroupLetter(groupNumber)}`}
      </Text>
    );
  };
  const { selectedUserGroup, mode } = useOutletContext();
  const resultsMode = mode === 'results';
  const isMobile = useIsMobile();
  return (
    <FormWrapper id="prediction-form-wrapper">
      <GroupTitle />
      <Form
        id="prediction-form"
        onSubmit={handleSubmit ? handleSubmit : undefined}
      >
        <Table fullWidth={isMobile} id="prediction-table">
          <Table.Body>
            {/* // TODO: Este mapeo está heavy, ver si se puede descomprimir un cacho... */}
            {data?.map((match) => {
              const predictionStatus = () =>
                match.status === 0
                  ? checkPredictionResult(
                      data,
                      match.id,
                      'away',
                      values[`${match.id}-away`],
                      values[`${match.id}-home`]
                    )
                  : 'silver';
              const matchResultString = `Resultado: ${match.away?.shortName} ${match.awayScore}-${match.homeScore} ${match.home?.shortName}`;
              const canPredict = calculateIfCanPredict(
                match.date,
                selectedUserGroup
              );

              const renderInfoIcon = () => {
                if (!resultsMode) return null;
                const colorStatus = predictionStatus();
                switch (colorStatus) {
                  case 'silver':
                    return '-';
                  case 'lightgreen':
                    return '-';
                  case '#FFFF66':
                    return (
                      <ErrorInfo
                        color={predictionStatus()}
                        info={matchResultString}
                      />
                    );
                  case 'tomato':
                    return (
                      <ErrorInfo
                        color={predictionStatus()}
                        info={matchResultString}
                      />
                    );
                  default:
                    return null;
                }
              };

              return (
                <React.Fragment key={match.id}>
                  <Table.Row>
                    <Table.Cell padding="1rem 8px">
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
                        value={formatInputDisplayValue(
                          values[`${match.id}-away`]
                        )}
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
                        name={`${match.id}-home`}
                        id={`${match.id}-home`}
                        value={formatInputDisplayValue(
                          values[`${match.id}-home`]
                        )}
                        onChange={handleChange}
                        disabled={resultsMode || !canPredict}
                        predictionStatus={
                          resultsMode ? predictionStatus('home') : ''
                        }
                        type="number"
                        width="30px"
                        min={0}
                        align="center"
                      />
                    </Table.Cell>
                    <Table.Cell padding="5px" fontWeight="800">
                      {match.home?.shortName || match.home}
                    </Table.Cell>
                    <Table.Cell padding="1rem 8px" margin="0 1rem 0 0">
                      {getFlagUrl(match.home?.flag, 1)}
                    </Table.Cell>
                  </Table.Row>
                </React.Fragment>
              );
            })}
          </Table.Body>
        </Table>
        {!resultsMode && (
          <Button type="submit" disabled={!selectedUserGroup?.id || !dirty}>
            {selectedUserGroup?.id
              ? 'Enviar prediccion'
              : 'Seleccione un grupo'}
          </Button>
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
