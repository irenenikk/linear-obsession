import React from 'react'
import NormalDistribution from './NormalDistribution'
import Slider from './Slider'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { e: 0, v: 1, min: -10, max: 10 }
  }

  componentDidMount() {
    this.calculateDistribution()
  }

  getNormalDensity = (x, mu, sigma) => {
    return Math.pow(Math.E, -1*Math.pow(x-mu, 2)/2*Math.pow(sigma, 2)) * 1/(sigma * Math.sqrt(2 * Math.PI))
  }

  roundPrecisely = (n) => {
    return Math.round(n*100)/100;
  }

  calculateDistribution = () => {
    debugger
    let values = []
    let maxValue = 0
    let minDistanceFromZero = 1
    for(let i = this.state.min; i < this.state.max; i += 0.2) {
      const dens = this.getNormalDensity(i, this.state.e, this.state.v)
      if (Math.abs(i) < Math.abs(minDistanceFromZero)) {
        minDistanceFromZero = this.roundPrecisely(i)
      }
      maxValue = Math.max(maxValue, dens)
      values.push({ y: dens, x:  this.roundPrecisely(i)})
    }
    this.setState({ data: { values, maxValue, minDistanceFromZero }})
  }

  changeExpectedValue = (value) => {
    this.setState({ e: value }, () => {
      this.calculateDistribution()
    })
  }

  changeVariance = (value) => {
    const v = (value === 0 ? 0.0001 : value)
    this.setState({ v }, () => {
      this.calculateDistribution()
    })
  }

  render() {
    return (
      <div className="app">
        {
          !this.state.data &&  <div>Loading</div>
        }
        {
          this.state.data &&
          <div>
            <NormalDistribution size={700} data={this.state.data} standard={this.state.e === 0 && this.state.v === 1}/>
            <Slider title="Expected value" min={this.state.min} max={this.state.max} onChange={this.changeExpectedValue} value={this.state.e}/>
            <Slider title="Variance" min={0} max={this.state.max} onChange={this.changeVariance} value={this.state.v}/>
            {
              this.state.v === 0.0001 && <div><div className="warning">Variance actually can't be zero</div> <div>But it's cool to see how the distribution acts in the corner cases, so here the actual value is 0.0001</div></div>
            }
          </div>
        }
      </div>
    );
  }
}

export default App;
