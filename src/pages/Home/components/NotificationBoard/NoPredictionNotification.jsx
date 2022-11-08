import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Text } from "common/common.styles";

export function NoPredictionNotification() {
  const { t } = useTranslation();
  return (
    <>
      <Text weight="500" size="2rem" align="center">
        {t('noPredictionsYet')}
      </Text>
      <Text align="center" size="1.2rem">
        {" "}
        {t('fromThisSection.a')} <Link to="/predictions/">{t('fromThisSection.b')}</Link>
      </Text>
    </>
  );
}
