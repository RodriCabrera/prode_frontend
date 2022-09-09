import React, { useState, useEffect } from 'react';
import useNavContext from '../../../../../common/Navigator/useNavContext';
import {
  filterPredictionsForFixture,
  getCountByResultType,
  getMatchList,
} from '../../../scoresPageHelpers';
import CustomPieChart from '../../PieChart';

export default function Graphs({ predictions, rules }) {
  const fixture = useNavContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (predictions?.length < 1 || fixture?.length < 1) return;
    const matches = getMatchList(fixture);
    setData(filterPredictionsForFixture(predictions, matches));
  }, [fixture, predictions]);

  if (data.length < 1) return <div>No hay nada aquí</div>;
  return <CustomPieChart data={getCountByResultType(data, rules.scoring)} />;
}
