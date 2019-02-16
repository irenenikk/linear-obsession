import React from 'react'
import Figure from './Figure'
const gaussian = require('gaussian')
const cov = require('compute-covariance')

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      min: -10,
      max: 10, 
      showLinear: false,
    }
  }

  componentDidMount() {
    this.calculateDistribution()
  }

  getNormalDensity = (x, mu, sigma2) => {
    return Math.pow(Math.E, -1*Math.pow(x-mu, 2)/(2*sigma2)) * 1/Math.sqrt(2 * Math.PI * sigma2)
  }

  getData = (x, a, b) => {
    const distribution = gaussian(0, 1);
    return a * x + b + distribution.ppf(Math.random());
  }
  
  getLinearFunction = (x, a , b) => {
    return a * x + b;
  }

  roundPrecisely = (n) => {
    return Math.round(n*100)/100;
  }

  getRandomCoefficient = () => {
    return Math.random(-this.state.min/2, this.state.max/2) 
  }

  calculateMean = (arr) => {
    return arr.reduce((acc, curr) => acc + curr, 0) / (arr.length - 1)
  }

  calculateBestLinearPrediction = (x, y) => {
    const yMean = this.calculateMean(y)
    // covariance matrix:
    //        X    |    Y
    // X    Var(X)   Cov(X,Y)
    // Y  Cov(X,Y)    Var(Y)
    const covMatrix = cov(x, y)
    if (!covMatrix) {
      return {a: 0, b: 0};
    }
    const xVariance = covMatrix[0][0]
    const covariance = covMatrix[0][1];
    const xMean = this.calculateMean(x)
    // Y = cov(X,Y)/Var(X) * X + EY - cov(X,Y)/Var(X) * EX 
    const a = covariance/xVariance
    return { a, b: yMean - a * xMean } 
  }

  calculateDistribution = () => {
    const a = this.getRandomCoefficient()
    const b = this.getRandomCoefficient()
    let data = []
    const xs = []
    const ys = []
    for(let i = this.state.min; i < this.state.max; i += 0.2) {
      const dat = this.getData(i, a, b)
      const trueLinear = this.getLinearFunction(i, a, b)
      const x = this.roundPrecisely(i)
      ys.push(dat)
      xs.push(x)
      data.push({ y: dat, trueLinear, x})
    }
    const pred = this.calculateBestLinearPrediction(xs, ys)
    const withPrediction = data.map(d => {
      return{...d, linearPrediction: this.getLinearFunction(d.x, pred.a, pred.b)}
    })
    this.setState({ data: withPrediction, trueCoefficients: {a, b}, linearPrediction: pred })
  }


  toggleShowLinearPrediction = () => {
    this.setState({ showLinear: !this.state.showLinear})
  }

  render() {
    return (
      <div className="app">
        <h1 class="header" >Linear obsession</h1>
        <div class="description" >Click on the button below to see the linear prediction function</div>
        {
          !this.state.data &&  <div>Loading</div>
        }
        {
          this.state.data &&
          <div>
            <div>
              <button onClick={() => this.toggleShowLinearPrediction()}>Show linear prediction</button>
              <button onClick={() => this.calculateDistribution()}>Reset data</button>
            </div>
            <div>
              True value for slope: {this.roundPrecisely(this.state.trueCoefficients.a)} and intercept: {this.roundPrecisely(this.state.trueCoefficients.b)}
            </div>
            { this.state.showLinear && <div>
              Prediction for slope: {this.roundPrecisely(this.state.linearPrediction.a)} and intercept: {this.roundPrecisely(this.state.linearPrediction.b)}
            </div>}
            <Figure size={700} data={this.state.data} showLinear={this.state.showLinear}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
