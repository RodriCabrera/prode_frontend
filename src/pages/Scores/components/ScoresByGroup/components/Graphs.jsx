import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import useNavContext from "../../../../../common/Navigator/useNavContext";
import {
  filterPredictionsForFixture,
  getCountByResultType,
  groupUsersByResultType,
  calcScoreProgressByDate,
  pairUsernameWithAvatar,
} from "../../../scoresPageHelpers";
import CustomPieChart from "../../../../../common/Charts/PieChart";
import MultipleLines from "../../../../../common/Charts/MultipleLines";
import ToggleSwitch from "../../../../../common/ToggleSwitch/ToggleSwitch";
import SingleMatchList from "./SingleMatchList";
import UserList from "./UserList";

const GRAPHS = {
  PIE_CHART: "pie",
  USER_PROGRESS: "users_p",
};

const switchModes = {
  left: {
    name: GRAPHS.PIE_CHART,
    display: "ACIERTOS",
    color: "gold",
  },
  right: {
    name: GRAPHS.USER_PROGRESS,
    display: "PROGRESO",
    color: "darkorange",
  },
};

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
`;

export default function Graphs({ predictions, groupData }) {
  const { data: fixture, current } = useNavContext();
  const [data, setData] = useState([]);
  const [graph, setGraph] = useState(switchModes.left.name);
  const [usersInfo, setUsersInfo] = useState({
    show: false,
    users: null,
    info: null,
  });

  useEffect(() => {
    if (predictions?.length < 1 || fixture?.length < 1 || !graph) return;
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

  if (data.length < 1) return <div>No hay nada aquí</div>;
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
          data={getCountByResultType(data, groupData?.rules.scoring)}
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
