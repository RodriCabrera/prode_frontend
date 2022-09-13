import React, { useState, useEffect } from 'react';
import useNavContext from '../../../../../common/Navigator/useNavContext';
import {
  filterPredictionsForFixture,
  getCountByResultType,
  groupUsersByResultType,
  calcScoreProgressByDate,
  pairUsernameWithAvatar,
} from '../../../scoresPageHelpers';
import CustomPieChart from '../../../../../common/Charts/PieChart';
import MultipleLines from '../../../../../common/Charts/MultipleLines';
import SingleMatchList from './SingleMatchList';
import UserList from './UserList';
import { Button } from '../../../../../common/common.styles';

const GRAPHS = {
  PIE_CHART: 'pie',
  USER_PROGRESS: 'users_p',
};

export default function Graphs({ predictions, groupData }) {
  const { data: fixture, current } = useNavContext();
  const [data, setData] = useState([]);
  const [graph, setGraph] = useState(GRAPHS.PIE_CHART);
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
    <>
      {graph === GRAPHS.PIE_CHART && (
        <CustomPieChart
          data={getCountByResultType(data, groupData?.rules.scoring)}
          clickHandler={handlePieClick}
        />
      )}
      {graph === GRAPHS.USER_PROGRESS &&
        (data.length > 1 ? (
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
      <div>
        <Button
          onClick={() =>
            setGraph(
              graph === GRAPHS.PIE_CHART
                ? GRAPHS.USER_PROGRESS
                : GRAPHS.PIE_CHART
            )
          }
        >
          Change graph
        </Button>
      </div>
    </>
  );
}
