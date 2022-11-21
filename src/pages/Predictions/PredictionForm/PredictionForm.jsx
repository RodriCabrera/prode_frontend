import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { useOutletContext, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useFlags } from "flagsmith/react";

import ErrorInfo from "../../../common/MoreInfo/ErrorInfo";
import Table from "../../../common/Table/Table";
import { getFlagUrl } from "../../pagesHelpers";
import {
  calculateIfCanPredict,
  checkPredictionResult,
  formatInputDisplayValue,
  formatPredictionsToDisplay,
  formatPredictionsToPost,
  getErrorMessageForMatch,
} from "../predictionsPageUtils";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { getPredictions, createPredictions } from "../../../api/predictions";
import { BallLoader } from "common/Spinner/BallLoader";
import useCleanupController from "../../../hooks/useCleanupController";
import {
  STAGE_NAMES,
  getStageName,
} from "../PredictionManager/PredictionManagerUtils";

import { FormWrapper } from "../Predictions.styles";
import {
  Button,
  CardContainer,
  CardWrapper,
  Form,
  Input,
} from "../../../common/common.styles";

export default function PredictionForm({ fixture, hasChangedGroup }) {
  const { selectedUserGroup, mode, isNew } = useOutletContext();
  const resultsMode = mode === "results";
  const [signal, cleanup, handleCancel] = useCleanupController();
  const [isLoading, setIsLoading] = useState(hasChangedGroup || false);
  const { phase } = useParams();
  const { values, handleChange, resetForm, dirty, setStatus, status } =
    useFormik({
      initialValues: {},
    });
  const [errorMessages, setErrorMessages] = useState([]);
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const flags = useFlags(["allow_new_user_predict"]);
  const newCanPredict = flags.allow_new_user_predict.enabled;

  const fetchAndSetPredictions = () => {
    setStatus({ loading: true });
    getPredictions(
      selectedUserGroup?.id,
      fixture.id ? undefined : getStageName(phase),
      fixture.id || undefined,
      undefined,
      signal
    )
      .then((res) => {
        resetForm({ values: formatPredictionsToDisplay(res.data) } || {});
        setStatus({ loading: false });
      })
      .finally(() => setIsLoading(false))
      .catch((err) => (handleCancel(err) ? setIsLoading(true) : null));
  };

  useEffect(() => {
    if (!fixture) return;
    setIsLoading(true);
    fetchAndSetPredictions();
    return cleanup;
  }, [fixture]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(
      createPredictions(formatPredictionsToPost(values, selectedUserGroup?.id))
        .then((res) => {
          setErrorMessages(res.data.errors);
          fetchAndSetPredictions();
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: `${t("predictionsSending.plural")}`,
        success: `${t("predictionsSent.plural")}`,
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
      <CardWrapper
        minHeight={resultsMode ? "360px" : "410px"}
        isMobile={isMobile}
        width="365px"
        border={isMobile ? "none" : null}
      >
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
                      "away",
                      values[`${match.id}-away`],
                      values[`${match.id}-home`]
                    )
                  : "silver";
              const matchResultString = `${t("results")}: ${
                match.away?.shortName
              } ${match.awayScore}-${match.homeScore} ${match.home?.shortName}`;
              const canPredict = calculateIfCanPredict(
                match.date,
                selectedUserGroup,
                phase,
                newCanPredict ? isNew : false
              );

              const renderInfoIcon = () => {
                if (!resultsMode) return null;
                const colorStatus = predictionStatus();
                switch (colorStatus) {
                  case "silver":
                    return "-";
                  case "lightgreen":
                    return "-";
                  case "#FFFF66":
                    return (
                      <ErrorInfo
                        color={predictionStatus()}
                        info={matchResultString}
                      />
                    );
                  case "tomato":
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
                          resultsMode ? predictionStatus("away") : ""
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
                          resultsMode ? predictionStatus("home") : ""
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
          <Button
            type="submit"
            disabled={!selectedUserGroup?.id || !dirty || status?.loading}
          >
            {t("send") + " " + t("predictions").toLowerCase()}
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
