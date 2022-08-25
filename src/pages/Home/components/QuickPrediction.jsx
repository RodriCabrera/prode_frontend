import React, { useState, useEffect } from 'react';
import { getRandomUnpredictedMatch } from '../../../api/predictions';
import {
  CardWrapper,
  CardTitle,
  CardContainer,
  Form,
  Input,
  Button,
} from '../../../common/common.styles';
import Table from '../../../common/Table/Table';
import { getFlagUrl } from '../../pagesHelpers';
import useCleanupController from '../../../hooks/useCleanupController';

// TODO: Hacer el post con la data bien formateada
// TODO: Mostrar para qué grupo es la predicción usando groupData
// TODO: Indicar fecha, fase y (grupo) del partido

export default function QuickPrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [matchData, setMatchData] = useState({});
  const [groupData, setGroupData] = useState({});
  const [inputValues, setInputValues] = useState({
    home: '',
    away: '',
  });
  const [signal, cleanup, handleCancel] = useCleanupController();

  const getMatchData = () => {
    setIsLoading(true);
    getRandomUnpredictedMatch(signal)
      .then((res) => {
        setInputValues({ home: '', away: '' })
        setMatchData(res.data.match);
        setGroupData(res.data.group)
      })
      .catch((err) => handleCancel(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getMatchData();
    return cleanup;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValues);
    getMatchData();
  };

  const handleChange = (e) => {
    if (e.target.name === 'awayScore')
      setInputValues((prevState) => ({ ...prevState, away: e.target.value }));
    else
      setInputValues((prevState) => ({ ...prevState, home: e.target.value }));
  };

  return (
    <CardContainer>
      <CardWrapper>
        <CardTitle>Predicción al paso</CardTitle>
        {matchData.id && (
          <Form onSubmit={handleSubmit}>
            <Table fullWidth>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{getFlagUrl(matchData.away.flag, 1)}</Table.Cell>
                  <Table.Cell>{matchData.away.shortName}</Table.Cell>
                  <Table.Cell>
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
                  </Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>
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
                  </Table.Cell>
                  <Table.Cell>{matchData.home.shortName}</Table.Cell>
                  <Table.Cell>{getFlagUrl(matchData.home.flag, 1)}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button
              type="submit"
              disabled={inputValues.away === '' || inputValues.home === ''}>
              Enviar
            </Button>
          </Form>
        )}
      </CardWrapper>
    </CardContainer>
  );
}
