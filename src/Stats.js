import React from 'react'
import { roundPrecisely } from './utils'

export default ({ trueCoefficients, linearPrediction, showPrediction }) => {
  const trueSlope = roundPrecisely(trueCoefficients.a)
  const trueIntercept = roundPrecisely(trueCoefficients.b)
  const predSlope    = roundPrecisely(linearPrediction.a)
  const predIntercept = roundPrecisely(linearPrediction.b)
  return (
    <div className="stats">
        <div className="heading">Real values and predictions:</div>
        <table className="center">
        <tr>
            <td></td>
            <th>Slope</th>
            <th>Intercept</th>
        </tr>
        <tr>
            <th>True value</th>
            <td>{trueSlope}</td>
            <td>{trueIntercept}</td>
        </tr>
        {showPrediction && 
        <tr>
            <th>Prediction</th>
            <td className={predSlope === trueSlope ? "correct" : ""}>{predSlope}</td>
            <td className={predIntercept === trueIntercept ? "correct" : ""}>{predIntercept}</td>
        </tr>
        }
        </table>
    </div>
  )
}