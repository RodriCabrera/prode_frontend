import React from 'react';
import styled from '@emotion/styled';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const TTip = styled.div`
    border-radius: 0.25rem;
    background: #26313c;
    padding: 1rem;
    color: ${({ color }) => color ? color : '#fff' };
    box-shadow: 15px 30px 40px 5px rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 1.2rem;
    font-width: 800;
`;

function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return(
            <TTip color={payload[0].payload.color}>
                    {payload[0].name}: {payload[0].payload.ammount}
            </TTip>
        )
    }
    return null;
}

// dataFormat = { name: 'NOMBRE_ELEMENTO', ammount: parseInt('VALOR A CONSIDERAR'), color: 'COLOR_REPRESENTATIVO'}

export default function CustomPieChart({ data, height }) {
  return (
    <ResponsiveContainer width="95%" height={height || 400}>
        <PieChart>
            <Pie
                dataKey="ammount"
                isAnimationActive={false}
                data={data}
                outerRadius="80%"
                fill="white"
                stroke='transparent'
            >
                {data.map((d) => <Cell key={d.name} fill={d.color}/> )}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
        </PieChart>
    </ResponsiveContainer>
  );
}
