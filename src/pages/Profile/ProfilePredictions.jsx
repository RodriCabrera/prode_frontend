import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getOtherUserPredictionsByGroup } from "api/predictions";
import useNavContext from "../../common/Navigator/useNavContext";
import { Info } from "common/Info/Info";
import { Spinner } from "common/Spinner/Spinner";
import FixtureTable from "../FixturePage/components/FixtureTable";
import useCleanupController from "hooks/useCleanupController";
import MatchNavigator from "../Scores/components/MatchNavigator";

import {
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
  TextGroup,
} from "common/common.styles";

function ProfilePredictions({ props }) {
  const { group, user } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [otherUserPredictions, setOtherUserPredictions] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();
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

  return (
    <>
      {isLoading && <Spinner />}
      {otherUserPredictions.length > 0 ? (
        <CardContainer>
          <CardWrapper border="none">
            <CardTitle>{`${t("predictionsFor")} ${group.name}`}</CardTitle>
            <MatchNavigator>
              <PredictionsDisplay predictions={otherUserPredictions} t={t} />
            </MatchNavigator>
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

function PredictionsDisplay({ predictions, t }) {
  const { data: fixture } = useNavContext();
  const matchIds = fixture.map((match) => match.id);
  const matchingPredictions = predictions.filter((prediction) =>
    matchIds.includes(prediction.matchId)
  );
  if (!predictions) return null;
  return matchingPredictions.length > 0 ||
    fixture[0]?.groups ||
    fixture[0]?.matches ? (
    <FixtureTable data={matchingPredictions} isCompact isMobile fullWidth />
  ) : (
    <TextGroup style={{ flexDirection: "column" }}>
      <Text align="center" margin={0}>
        {t("noPredictionsToShow")}
      </Text>
      <Info>{t("onlyPlayedPredictions")}</Info>
    </TextGroup>
  );
}

export default ProfilePredictions;
