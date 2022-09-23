import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styled from '@emotion/styled';

const defaultColors = [
  'gold',
  'red',
  'green',
  'lightblue',
  'orange',
  'yellow',
  'violet',
  'pink',
  'blue',
  'darkorange',
  'salmon',
  'cyan',
  'darkorchid',
  'aquamarine',
  'lightseagreen',
  'tomato',
  'thistle',
  'turqoise',
  'peru',
  'moccasin',
  'magenta',
  'lavender',
  'lightcyan',
  'deeppink',
];

export default function MultipleLines({
  data,
  colors = defaultColors,
  userAvatars,
  height,
}) {
  function renderCustomDot({ cx, cy, dataKey, fill, index }) {
    if (index === data.length - 1) {
      cx -= 30;
      cy -= 10;
    }
    return !userAvatars[dataKey] ? (
      <>
        <svg
          fill="white"
          stroke="white"
          strokeWidth={0}
          viewBox="0 0 20 20"
          height={30}
          width={30}
          x={cx - 15}
          y={cy - 15}
        >
          <circle cx={10} cy={10} r={10} />
        </svg>
        <svg
          stroke={fill}
          fill={fill}
          strokeWidth={0}
          viewBox="0 0 20 20"
          height={40}
          width={40}
          x={cx - 20}
          y={cy - 20}
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
      </>
    ) : (
      <svg>
        <foreignObject x={cx - 20} y={cy - 20} width={40} height={40}>
          <img width="100%" height="100%" style={{ borderRadius: '100%' }} src={`${userAvatars[dataKey]}`} />
        </foreignObject>
      </svg>
    );
  }

  const TTip = styled.div`
    border-radius: 0.25rem;
    background: black;
    padding: 1rem;
    margin: 1rem 1.2rem;
    box-shadow: 15px 30px 40px 5px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: space-evenly;
    & p {
      text-align: left;
      font-size: 1.2rem;
      font-width: 900;
    }
  `;

  function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
      const orderedPayload = payload.sort((a, b) => b.value - a.value);
      return (
        <TTip>
          {orderedPayload.map((point) => {
            return (
              <p
                key={point.name}
                style={{ color: point.color }}
              >{`${point.name}: ${point.value}`}</p>
            );
          })}
        </TTip>
      );
    }
    return null;
  }
  return (
    <ResponsiveContainer width="95%" height={height || 400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="1" />
        <XAxis
          dataKey="date"
          dy={15}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString(undefined, {
              day: 'numeric',
              month: 'numeric',
            })
          }
        />
        <YAxis unit="pts" dx={-10} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ marginBottom: '-1.2rem' }} />
        {Object.keys(data[0]).map((key, index) => {
          if (key === 'date') return null;
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              isAnimationActive={false}
              strokeWidth={2}
              stroke={colors[index]}
              activeDot={renderCustomDot}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
