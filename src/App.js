import React, { Component } from 'react';
import './App.css';
import MortgageCalculator from './containers/MortgageCalculator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Mortgage Calculator</h2>
        </div>
        <div className="section">
          <MortgageCalculator />
        </div>
      </div>
    );
  }
}

export default App;
