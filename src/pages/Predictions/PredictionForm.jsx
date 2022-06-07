import styled from '@emotion/styled';
import { useOutletContext } from 'react-router-dom';
import { Button, Form, Input, Text } from '../../common/common.styles';
import ErrorInfo from '../../common/MoreInfo/ErrorInfo';
import Table from '../../common/Table/Table';
import { getFlagUrl, parseDate } from '../pagesHelpers';
import {
  checkPredictionResult,
  getErrorMessageForMatch,
  numberToGroupLetter,
} from './predictionsPageUtils';

function PredictionForm(props) {
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
  } = props;

  const [selectedGroup] = useOutletContext();

  return (
    <FormWrapper>
      <Text align="center" size="1.7rem" weight="600">
        {`GRUPO ${numberToGroupLetter(groupNumber)}`}
      </Text>
      <Form onSubmit={handleSubmit}>
        <Table>
          <Table.Body>
            {stageData[groupNumber]?.matches.map((match) => {
              const predictionStatus = () =>
                checkPredictionResult(
                  stageData,
                  groupNumber,
                  match.id,
                  'away',
                  values[`${match.id}-away`],
                  values[`${match.id}-home`]
                );
              const matchResult = `Resultado: ${match.away.shortName} ${match.awayScore}-${match.homeScore} ${match.home.shortName}`;
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
                        info={matchResult}
                      />
                    );

                  if (predictionStatus() === 'tomato')
                    return (
                      <ErrorInfo
                        color={predictionStatus()}
                        info={matchResult}
                      />
                    );
                }
                return null;
              };
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
                        predictionStatus={
                          resultsMode ? predictionStatus('away') : ''
                        }
                      />
                    </Table.Cell>
                    <Table.Cell padding="0">{renderInfoIcon()}</Table.Cell>
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
                        predictionStatus={
                          resultsMode ? predictionStatus('home') : ''
                        }
                      />
                    </Table.Cell>
                    <Table.Cell padding="5px" fontWeight="800">
                      {match.home.shortName || '?'}
                    </Table.Cell>
                    <Table.Cell padding="0">
                      {getFlagUrl(match.home.flag, 1)}
                    </Table.Cell>
                    {!resultsMode && (
                      <ErrorInfo
                        info={getErrorMessageForMatch(errorMessages, match.id)}
                      />
                    )}
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
    background-color: ${({ predictionStatus }) => predictionStatus};
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
export default PredictionForm;
