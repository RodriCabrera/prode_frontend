import styled from '@emotion/styled';
import {
  Button,
  CardContainer,
  CardWrapper,
  Form,
  Input,
} from '../../../common/common.styles';
import ErrorInfo from '../../../common/MoreInfo/ErrorInfo';
import Table from '../../../common/Table/Table';
import { getFlagUrl } from '../../pagesHelpers';
import { FormWrapper } from '../Predictions.styles';
import {
  checkPredictionResult,
  getErrorMessageForMatch,
  formatPredictionsToPost,
  formatPredictionsToDisplay,
  calculateIfCanPredict,
  formatInputDisplayValue,
} from '../predictionsPageUtils';
import { useIsMobile } from '../../../hooks/useIsMobile';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useOutletContext, useParams } from 'react-router-dom';
import { getPredictions, createPredictions } from '../../../api/predictions';
import { BallLoader } from '../../../common/Spinner/BallLoader';
import useCleanupController from '../../../hooks/useCleanupController';
import { toast } from 'react-toastify';
import {
  STAGE_NAMES,
  getStageName,
} from '../PredictionManager/PredictionManagerUtils';

export default function NewPredictionForm({ fixture, hasChangedGroup }) {
  const { selectedUserGroup, mode } = useOutletContext();
  const resultsMode = mode === 'results';
  const [predictions, setPredictions] = useState({});
  const [signal, cleanup, handleCancel] = useCleanupController();
  const [isLoading, setIsLoading] = useState(hasChangedGroup || false);
  const { phase } = useParams();
  const { values, handleChange, resetForm, dirty } = useFormik({
    initialValues: {},
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    console.log(fixture);
    if (!fixture) return;
    setIsLoading(true);
    getPredictions(
      selectedUserGroup?.id,
      fixture.id ? undefined : getStageName(phase),
      fixture.id || undefined,
      signal
    )
      .then((res) => setPredictions(res.data))
      .finally(() => setIsLoading(false))
      .catch((err) =>
        handleCancel(err) ? setIsLoading(true) : console.log(err)
      );
    return cleanup;
  }, [fixture]);

  useEffect(() => {
    resetForm({ values: formatPredictionsToDisplay(predictions) } || {});
  }, [predictions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(
      createPredictions(formatPredictionsToPost(values, selectedUserGroup?.id))
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          setIsLoading(false);
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

  const data = () => {
    if (!fixture) return null;
    else if (getStageName(phase) === STAGE_NAMES.GRUPOS)
      return fixture?.matches;
    else return fixture;
  };
  return isLoading || hasChangedGroup ? (
    <CardContainer>
      <CardWrapper minHeight="345px" width="365px">
        <BallLoader />
      </CardWrapper>
    </CardContainer>
  ) : (
    <FormWrapper id="prediction-form-wrapper">
      <Form
        id="prediction-form"
        onSubmit={handleSubmit ? handleSubmit : undefined}
      >
        <Table fullWidth={isMobile} id="prediction-table">
          <Table.Body>
            {data()?.map((match) => {
              const predictionStatus = () =>
                match.status === 0
                  ? checkPredictionResult(
                      data(),
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
