import React, { useState } from 'react';
import { Text, Input, Button } from '../../../../common/common.styles';
import {
  SinglePredictionForm,
  PredictionMatch,
} from './quickPredictions.styles';
import { toast } from 'react-toastify';
import { createPredictions } from '../../../../api/predictions';
import { getFlagUrl, parseDate } from '../../../pagesHelpers';

export default function MiniForm({ matchData, groupData, afterSubmit }) {
  const [inputValues, setInputValues] = useState({
    home: '',
    away: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
          home: '',
          away: '',
        });
        afterSubmit();
      }),
      {
        pending: 'Enviando predicción',
        success: 'Predicción enviada',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const handleChange = (e) => {
    if (e.target.name === 'awayScore')
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
        <Text>{matchData.away.shortName}</Text>
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
        <Text>{matchData.home.shortName}</Text>
        {getFlagUrl(matchData.home.flag, 1)}
      </PredictionMatch>
      <Button
        type="submit"
        disabled={inputValues.away === '' || inputValues.home === ''}>
        Enviar
      </Button>
    </SinglePredictionForm>
  );
}
