import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getPredictionCompletePercentage } from "../../../api/predictions";
import { getFixtureStatus } from "api/fixture";
import useCleanupController from "hooks/useCleanupController";
import { BallLoader } from "common/Spinner/BallLoader";
import { Banner } from "./Banner";

import { Text } from "../../../common/common.styles";
import { BannerContainer } from "../Predictions.styles";

function BannerList() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const { selectedUserGroup, mode } = useOutletContext();
  const [predictedPercentages, setPredictedPercentages] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { t } = useTranslation();
  const [stageStatus, setStageStatus] = useState({
    GRUPOS: false,
    OCTAVOS: false,
    CUARTOS: false,
    SEMIFINAL: false,
    FINAL: false,
    TERCER_PUESTO: false,
  });

  useEffect(() => {
    if (mode === "edit") {
      setIsLoading(true);
      getPredictionCompletePercentage(selectedUserGroup?.id, signal)
        .then((res) => {
          setPredictedPercentages(res.data);
        })
        .catch((err) => handleCancel(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
    return cleanup;
  }, [selectedUserGroup, mode]);

  const calculatePercentage = (quantities) => {
    return Math.round((quantities.predicted / quantities.total) * 100);
  };

  useEffect(() => {
    getFixtureStatus()
      .then((res) => {
        setStageStatus(res.data);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }, []);

  const bannerData = [
    {
      id: 1,
      title: t("groups").toUpperCase(),
      path: "groups",
      percentage: predictedPercentages.GRUPOS
        ? calculatePercentage(predictedPercentages.GRUPOS)
        : null,
    },
    {
      id: 2,
      title: t("eight").toUpperCase(),
      path: "16",
      percentage: predictedPercentages.OCTAVOS
        ? calculatePercentage(predictedPercentages.OCTAVOS)
        : null,
    },
    {
      id: 3,
      title: t("quarterfinals").toUpperCase(),
      path: "8",
      percentage: predictedPercentages.CUARTOS
        ? calculatePercentage(predictedPercentages.CUARTOS)
        : null,
    },
    {
      id: 4,
      title: "SEMIFINAL",
      path: "semis",
      percentage: predictedPercentages.SEMIFINAL
        ? calculatePercentage(predictedPercentages.SEMIFINAL)
        : null,
    },
    {
      id: 5,
      title: t("thirdPosition").toUpperCase(),
      path: "3",
      percentage: predictedPercentages.TERCER_PUESTO
        ? calculatePercentage(predictedPercentages.TERCER_PUESTO)
        : null,
    },
    {
      id: 6,
      title: "FINAL",
      path: "final",
      percentage: predictedPercentages.FINAL
        ? calculatePercentage(predictedPercentages.FINAL)
        : null,
    },
  ];

  return (
    <BannerContainer>
      <Text align="center" size="2rem" weight="700">
        {t("phases").toUpperCase()}
      </Text>
      {loadingStatus ? (
        <BallLoader />
      ) : (
        bannerData.map((stage) => {
          return (
            <Banner
              key={stage.id}
              title={stage.title}
              path={stage.path}
              percentage={stage.percentage}
              isLoading={isLoading}
              disabled={stageStatus[stage.title.replace(" ", "_")]}
            />
          );
        })
      )}
    </BannerContainer>
  );
}

export default BannerList;
