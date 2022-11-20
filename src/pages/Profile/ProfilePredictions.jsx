import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getOtherUserPredictionsByGroup } from "api/predictions";
import { Info } from "common/Info/Info";
import { Spinner } from "common/Spinner/Spinner";
import FixtureTable from "../FixturePage/components/FixtureTable";
import useCleanupController from "hooks/useCleanupController";

import {
  Button,
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
} from "common/common.styles";

function ProfilePredictions({ props }) {
  const { group, user } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [otherUserPredictions, setOtherUserPredictions] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const [showShortList, setShowShortList] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (!group || !user) return;
    setIsLoading(true);
    getOtherUserPredictionsByGroup(user.id, group._id, signal)
      .then(({ data }) => {
        setOtherUserPredictions(data);
      })
      .catch((err) => {
        handleCancel(err) || alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, [props]);

  const predictionsToRender = () => {
    const predictions = showShortList
      ? otherUserPredictions.slice(0, 10)
      : otherUserPredictions;
    return predictions.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <>
      {isLoading && <Spinner />}
      {otherUserPredictions.length > 0 ? (
        <CardContainer>
          <CardWrapper border="none">
            <CardTitle>{`${t("predictionsFor")} ${group.name}`}</CardTitle>
            <FixtureTable
              data={predictionsToRender()}
              isCompact
              isMobile
              fullWidth
            />
            {otherUserPredictions.length > 10 && (
              <Button
                padding="10px"
                tertiary
                onClick={() => setShowShortList(!showShortList)}
              >
                {showShortList ? "Mostrar más" : "Mostrar menos"}
              </Button>
            )}
          </CardWrapper>
        </CardContainer>
      ) : (
        !isLoading && (
          <>
            <Text align="center">{t("noPredictionsToShow")}</Text>
            <Info>{t("onlyPlayedPredictions")}</Info>
          </>
        )
      )}
    </>
  );
}

export default ProfilePredictions;
