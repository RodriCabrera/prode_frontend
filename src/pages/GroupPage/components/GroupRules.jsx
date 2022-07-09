import React from 'react';
import { Text } from '../../../common/common.styles';
import { References } from '../../../common/References';
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
      <References
        size="1rem"
        green={`Resultado exacto: ${rules.scoring.FULL}`}
        yellow={`Ganador: ${rules.scoring.WINNER}`}
        red={`Resultado erróneo: ${rules.scoring.NONE}`}
      />
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
