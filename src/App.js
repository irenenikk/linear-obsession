import React from 'react'
import NormalDistribution from './NormalDistribution'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { }
  }

  componentWillMount() {
    let values = []
    let maxValue = 0
    let minDistanceFromZero = 1
    for(let i = -10; i < 10; i += 0.2) {
      const dens = this.getNormalDensity(i, 0, 1)
      if (Math.abs(i) < Math.abs(minDistanceFromZero)) {
        minDistanceFromZero = i
      }
      maxValue = Math.max(maxValue, dens)
      values.push({ y: dens, x: i})
    }
    this.setState({ data: { values, maxValue, minDistanceFromZero }})
  }

  getNormalDensity = (x, mu, sigma) => {
    return Math.pow(Math.E, -1*Math.pow(x-mu, 2)/2*Math.pow(sigma, 2)) * 1/(sigma * Math.sqrt(2 * Math.PI))
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="app">
        {
          !this.state.data &&  <div>Loading</div>
        }
        {
          this.state.data &&
          <NormalDistribution data={this.state.data}/>
        }
      </div>
    );
  }
}

export default App;
