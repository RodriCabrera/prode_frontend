import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const defaultColors = ['gold', 'red', 'green', 'blue', 'orange', 'violet', 'pink', 'white', 'darkorange']

export default function MultipleLines({ data, colors=defaultColors, height }) {
  return (
    <ResponsiveContainer width="95%" height={height || 400}>
        <LineChart
            data={data}
        >
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="date"/>
          <YAxis unit="pts" />
          <Tooltip />
          <Legend />
          {Object.entries(data[0]).map(([key, value], index) => {
            if (key === 'date') return null
            return <Line key={key} type="monotone" dataKey={key} stroke={colors[index]} activeDot={{ r: 8 }} />
          })}
        </LineChart>
    </ResponsiveContainer>
  )
}
