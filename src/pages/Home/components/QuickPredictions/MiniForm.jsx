import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { createPredictions } from "../../../../api/predictions";
import { getFlagUrl, parseDate } from "../../../pagesHelpers";

import {
  SinglePredictionForm,
  PredictionMatch,
} from "./quickPredictions.styles";
import { Text, Input, Button } from "../../../../common/common.styles";

export default function MiniForm({
  matchData,
  groupData,
  afterSubmit,
  setIsLoading,
}) {
  const [inputValues, setInputValues] = useState({
    home: "",
    away: "",
  });
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(
      createPredictions({
        prediction: {
          userGroupId: groupData._id,
          matchId: matchData.id,
          homeScore: parseInt(inputValues.home),
          awayScore: parseInt(inputValues.away),
        },
      }).then(() => {
        setInputValues({
          home: "",
          away: "",
        });
        afterSubmit();
      }),
      {
        pending: `${t('predictionSending.single')}`,
        success:  `${t('predictionSent.single')}`,
        error: {
          render({ data }) {
            setIsLoading(false);
            return data.response.data.error;
          },
        },
      }
    );
  };

  const handleChange = (e) => {
    if (e.target.name === "awayScore")
      setInputValues((prevState) => ({ ...prevState, away: e.target.value }));
    else
      setInputValues((prevState) => ({ ...prevState, home: e.target.value }));
  };

  return (
    <SinglePredictionForm onSubmit={handleSubmit}>
      <Text align="center">
        {matchData.group || matchData.stage} - {parseDate(matchData.date)}
      </Text>
      <PredictionMatch>
        {getFlagUrl(matchData.away.flag, 1)}
        <Text noBreak>{matchData.away.shortName}</Text>
        <Input
          type="number"
          width="30px"
          min={0}
          align="center"
          name="awayScore"
          aria-label="away score"
          id={`${matchData.id}-away`}
          value={inputValues.away}
          onChange={handleChange}
        />
        <Text>-</Text>
        <Input
          type="number"
          width="30px"
          min={0}
          align="center"
          name="homeScore"
          aria-label="home score"
          id={`${matchData.id}-home`}
          value={inputValues.home}
          onChange={handleChange}
        />
        <Text noBreak>{matchData.home.shortName}</Text>
        {getFlagUrl(matchData.home.flag, 1)}
      </PredictionMatch>
      <Button
        type="submit"
        disabled={inputValues.away === "" || inputValues.home === ""}
      >
        {t('send')}
      </Button>
    </SinglePredictionForm>
  );
}
