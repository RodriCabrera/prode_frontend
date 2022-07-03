import React from 'react';
import { Text } from '../../../common/common.styles';
import { translateDuration } from '../../pagesHelpers';

function GroupRules({ rules }) {
  if (!rules) return null;
  return (
    <>
      {rules.manifesto && (
        <>
          <Text size="1.2rem" withBottomBorder>
            Reglas
          </Text>
          <Text>{rules.manifesto}</Text>
          <br />
        </>
      )}
      <Text size="1.2rem" withBottomBorder>
        Sistema de puntaje
      </Text>
      <div>
        <Text align="center" color="lightgreen">
          Resultado exacto: {rules.scoring.FULL}
        </Text>
        <br />
        <Text align="center" color="yellow">
          Ganador: {rules.scoring.WINNER}
        </Text>
        <br />
        <Text align="center" color="red">
          Resultado erróneo: {rules.scoring.NONE}
        </Text>
      </div>
      <br />
      <Text size="1.2rem" withBottomBorder>
        Tiempos
      </Text>
      <Text>
        Puedes realizar predicciones hasta
        {translateDuration(rules.timeLimit)}
      </Text>
    </>
  );
}

export default GroupRules;
