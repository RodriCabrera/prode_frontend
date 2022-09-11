import React from 'react';
import styled from '@emotion/styled';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const TTip = styled.div`
  border-radius: 0.25rem;
  background: #26313c;
  padding: 1rem;
  color: ${({ color }) => (color ? color : '#fff')};
  box-shadow: 15px 30px 40px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 1.2rem;
  font-width: 800;
`;

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <TTip color={payload[0].payload.color}>
        {payload[0].name}: {payload[0].payload.ammount}
      </TTip>
    );
  }
  return null;
}

// dataFormat = { name: 'NOMBRE_ELEMENTO', ammount: parseInt('VALOR A CONSIDERAR'), color: 'COLOR_REPRESENTATIVO'}

export default function CustomPieChart({ data, clickHandler,height }) {
  const predictionAmmount = data.reduce(
    (acc, item) => (acc += item.ammount),
    0
  );
  const RADIAN = Math.PI / 180;
  function renderCustomLabel({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percent = data[index].ammount / predictionAmmount;
    if (percent === 0) return
    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? 'start' : 'center'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
  return (
    <ResponsiveContainer width="95%" height={height || 400}>
      <PieChart>
        <Pie
          dataKey="ammount"
          isAnimationActive={true}
          data={data}
          outerRadius="80%"
          fill="white"
          stroke="transparent"
          labelLine={false}
          label={renderCustomLabel}
        >
          {data.map((d) => (
            <Cell key={d.name} fill={d.color} onClick={() => clickHandler(d)}/>
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
