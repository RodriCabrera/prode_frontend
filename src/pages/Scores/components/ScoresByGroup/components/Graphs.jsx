import React, { useState, useEffect } from 'react';
import useNavContext from '../../../../../common/Navigator/useNavContext';
import {
  filterPredictionsForFixture,
  getCountByResultType,
  getMatchList,
  groupUsersByResultType,
  calcPointsScoredByDate,
  calcScoreProgressByDate
} from '../../../scoresPageHelpers';
import CustomPieChart from '../../PieChart';

export default function Graphs({ predictions, groupData }) {
  const fixture = useNavContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (predictions?.length < 1 || fixture?.length < 1) return;
    setData(filterPredictionsForFixture(fixture, predictions));
    calcScoreProgressByDate(fixture, predictions, groupData);
  }, [fixture, predictions]);



  const handlePieClick = (info) => {
    console.log(groupUsersByResultType(data, info.type, groupData))
  }

  if (data.length < 1) return <div>No hay nada aquí</div>;
  return <CustomPieChart data={getCountByResultType(data, groupData?.rules.scoring)} clickHandler={handlePieClick} />;
}
