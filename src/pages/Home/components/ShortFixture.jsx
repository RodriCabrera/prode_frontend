import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getNextMatches } from "api/fixture";
import { BallLoader } from "common/Spinner/BallLoader";
import useCleanupController from "hooks/useCleanupController";
import { useIsMobile } from "hooks/useIsMobile";
import FixtureTable from "../../FixturePage/components/FixtureTable";

import { CardTitle, CardWrapper, Text } from "common/common.styles";

const ShortFixture = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  useEffect(() => {
    getNextMatches(3, signal)
      .then((res) => {
        setData(res.data.fixture);
      })
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);

  return (
    <CardWrapper
      border={isMobile ? "none" : undefined}
      width="300px"
      minHeight="300px"
    >
      <CardTitle>{t("nextMatches")}</CardTitle>
      {isLoading && <BallLoader />}
      {!isLoading &&
        data &&
        (data.length > 0 ? (
          <FixtureTable
            id="short-fixture-card-container"
            data={data}
            isCompact
            fullWidth
          />
        ) : (
          <Text align="center" weight="600" color="gray" margin="2rem 0">
            {t("notComingMatches")}
          </Text>
        ))}
    </CardWrapper>
  );
};

export default ShortFixture;
