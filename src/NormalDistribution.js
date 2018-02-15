import React from 'react'
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, CartesianGrid } from 'recharts'

export default ({ size, data, standard }) => {
  console.log(data)
  return (
    <div className="app">
      <LineChart width={size} height={0.75*size}>
        <Line type="monotone" dataKey="y" stroke={standard ? "red" : "#8884d8"} data={data.values} />
        <XAxis dataKey="x"/>
        <ReferenceLine y={data.maxValue} stroke="black"/>
        <ReferenceLine x={data.minDistanceFromZero} stroke="black"/>
        <YAxis />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
      </LineChart>
    </div>
  );
}
