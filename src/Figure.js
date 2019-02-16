import React from 'react'
import { ComposedChart, Scatter, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default ({ data, showLinear }) => {
  return (
    <div className="app">
    	<ComposedChart width={800} height={600} data={data}
            margin={{top: 20, right: 20, bottom: 20, left: 20}}>
      	<CartesianGrid />
        <XAxis dataKey="x" type="number" />
      	<YAxis dataKey="y" type="number" />
        <Scatter data={data} fill='#8884d8'/>
      	<Tooltip cursor={{strokeDasharray: '3 3'}}/>
        <Line type="monotone" dataKey="trueLinear" stroke='#ff7300' dot={false} />
        {
          showLinear && 
          <Line type="monotone" dataKey="linearPrediction" stroke='#0000ff' dot={false} />
        }
      </ComposedChart>
    </div>
  );
}
