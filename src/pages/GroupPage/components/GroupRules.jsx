import { useTranslation } from "react-i18next";

import { References } from "common/References";
import { translateDuration } from "../../pagesHelpers";

import { Text } from "common/common.styles";

function GroupRules({ rules }) {
  const { t } = useTranslation();
  if (!rules) return null;
  return (
    <>
      {rules.manifesto && (
        <>
          <Text size="1.2rem" weight="600" withBottomBorder>
            {t('rules')}
          </Text>
          <Text>{rules.manifesto}</Text>
          <br />
        </>
      )}

      <Text size="1.2rem" weight="600" withBottomBorder>
        {t('timeLimit')}
      </Text>
      <Text>
        {t('timeLimitInfoText')}
        {translateDuration(rules, t)}
      </Text>
      <br />

      <Text size="1.2rem" weight="600" withBottomBorder>
        {t('scoringSystem')}
      </Text>
      <References
        size="1rem"
        green={`${t('resultExact')}: ${rules.scoring.FULL}`}
        yellow={`${t('resultWinner')}: ${rules.scoring.WINNER}`}
        red={`${t('resultNone')}: ${rules.scoring.NONE}`}
      />
      <br />
    </>
  );
}

export default GroupRules;
