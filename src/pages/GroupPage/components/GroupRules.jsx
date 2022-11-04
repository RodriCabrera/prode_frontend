import { References } from "common/References";
import { translateDuration } from "../../pagesHelpers";

import { Text } from "common/common.styles";

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

      <Text size="1.2rem" weight="600" withBottomBorder>
        Tiempos límite:
      </Text>
      <Text>
        Puedes realizar predicciones hasta
        {translateDuration(rules)}
      </Text>
      <br />

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
