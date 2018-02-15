import React from 'react'
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, CartesianGrid } from 'recharts'

export default ({ data }) => {
  return (
    <div className="app">
      <LineChart width={800} height={500}>
        <Line type="monotone" dataKey="y" stroke="#8884d8" data={data.values} />
        <XAxis dataKey="x"/>
        <ReferenceLine y={data.maxValue} stroke="black" label="max"/>
        <ReferenceLine x={data.minDistanceFromZero} stroke="black"/>
        <YAxis />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
      </LineChart>
    </div>
  );
}
