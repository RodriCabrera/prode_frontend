import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import CustomPieChart from "../../../../../common/Charts/PieChart";
import MultipleLines from "../../../../../common/Charts/MultipleLines";
import SingleMatchList from "./SingleMatchList";
import ToggleSwitch from "../../../../../common/ToggleSwitch/ToggleSwitch";
import useNavContext from "../../../../../common/Navigator/useNavContext";
import UserList from "./UserList";
import {
  filterPredictionsForFixture,
  getCountByResultType,
  groupUsersByResultType,
  calcScoreProgressByDate,
  pairUsernameWithAvatar,
} from "../../../scoresPageHelpers";
import { Text } from "../../../../../common/common.styles";

const GRAPHS = {
  PIE_CHART: "pie",
  USER_PROGRESS: "users_p",
};

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  margin: 0 0 4rem -1rem;
  overflow: hidden;
`;

export default function Graphs({ predictions, groupData }) {
  const { data: fixture, current } = useNavContext();
  const [data, setData] = useState([]);
  const [graph, setGraph] = useState(GRAPHS.PIE_CHART);
  const [usersInfo, setUsersInfo] = useState({
    show: false,
    users: null,
    info: null,
  });
  const { t } = useTranslation();

  const switchModes = {
    left: {
      name: GRAPHS.PIE_CHART,
      display: t("results").toUpperCase(),
      color: "gold",
    },
    right: {
      name: GRAPHS.USER_PROGRESS,
      display: t("progress"),
      color: "darkorange",
    },
  };

  useEffect(() => {
    if (predictions?.length < 1 || fixture?.length < 1 || !graph || !fixture)
      return;
    switch (graph) {
      case GRAPHS.USER_PROGRESS:
        setData(calcScoreProgressByDate(fixture, predictions, groupData));
        break;
      case GRAPHS.PIE_CHART:
      default:
        setData(filterPredictionsForFixture(fixture, predictions));
        break;
    }
    //
  }, [fixture, predictions, graph]);

  const handlePieClick = (info) => {
    setUsersInfo({
      show: true,
      users: groupUsersByResultType(data, info.type, groupData),
      info: { ...info, stage: current },
    });
  };

  if (data.length < 1)
    return (
      <Text align="center" color="salmon" size="2rem">
        {t("noData")}
      </Text>
    );
  if (usersInfo.show === true)
    return (
      <UserList
        users={usersInfo.users}
        displayInfo={usersInfo.info}
        handleClose={() =>
          setUsersInfo((prevInfo) => ({ ...prevInfo, show: false }))
        }
      />
    );

  return (
    <GraphContainer>
      <ToggleSwitch mode={graph} setMode={setGraph} modes={switchModes} />
      {graph === GRAPHS.PIE_CHART && (
        <CustomPieChart
          data={getCountByResultType(data, groupData?.rules.scoring, t)}
          clickHandler={handlePieClick}
        />
      )}
      {graph === GRAPHS.USER_PROGRESS &&
        (data.length > 1 || fixture.length > 1 ? (
          <MultipleLines
            data={data}
            userAvatars={pairUsernameWithAvatar(groupData.members)}
          />
        ) : (
          <SingleMatchList
            data={data[0]}
            userAvatars={pairUsernameWithAvatar(groupData.members)}
            scoring={groupData.rules.scoring}
          />
        ))}
    </GraphContainer>
  );
}
