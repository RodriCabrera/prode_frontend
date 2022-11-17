import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Text } from "../../../../common/common.styles";

export function UsernameNotification() {
  const { t } = useTranslation();
  return (
    <>
      <Text weight="500" size="2rem" align="center">
        {t("defaultUsername")}
      </Text>
      <Text align="center" size="1.2rem" margin="1rem 0 0 0">
        <Link to="/profile">{t("editProfile")}</Link>
      </Text>
    </>
  );
}
