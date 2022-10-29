<<<<<<< HEAD
import React from 'react';
import { Text, TextGroup } from '../../../common/common.styles';
import { References } from '../../../common/References';
import { translateDuration } from '../../pagesHelpers';
=======
import React from "react";
import { Text } from "../../../common/common.styles";
import { References } from "../../../common/References";
import { translateDuration } from "../../pagesHelpers";
>>>>>>> a4568261c9c39d5bc652e02819e8ff5c29600dce

function GroupRules({ rules }) {
  if (!rules) return null;
  return (
    <>
      {rules.manifesto && (
        <>
          <Text size="1.2rem" weight="600" withBottomBorder>
            Reglas
          </Text>
          <Text>{rules.manifesto}</Text>
          <br />
        </>
      )}
<<<<<<< HEAD
      <TextGroup>
=======
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
>>>>>>> a4568261c9c39d5bc652e02819e8ff5c29600dce
        <Text size="1.2rem" weight="600" withBottomBorder>
          Tiempos límite:
        </Text>
        <Text align='center'>
          Puedes realizar predicciones hasta
          {translateDuration(rules.timeLimit)}
        </Text>
      </TextGroup>
      <Text size="1.2rem" weight="600" withBottomBorder>
        Sistema de puntaje
      </Text>
      <References
        size="1rem"
        green={`Resultado exacto: ${rules.scoring.FULL}`}
        yellow={`Ganador: ${rules.scoring.WINNER}`}
        red={`Resultado erróneo: ${rules.scoring.NONE}`}
      />
      <br />
    </>
  );
}

export default GroupRules;
