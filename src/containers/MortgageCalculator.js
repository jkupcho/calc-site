import React, { Component } from 'react';
import { Label } from '../components/Bulma';

export default class MortgageCalculator extends Component {

  _updateField = (field) => {
    return (value) => {
      this.setState({
        [field]: value
      });
    };
  }



  constructor(props) {
    super(props);

    this.loanTerms = [15, 25, 30];
    this.state = {
      term: 0,
      principal: 0,
      rate: 0,
      downPayment: 0
    };
  }

  render() {
    return (
      <div className="container">
        <div className="field is-horizontal">
          <div className="field-body">
            <Label>Principal</Label>
            <div className="field is-grouped">
              <p className="control is-expanded">
                <input type="number" className="input" onChange={(event) => this._updateField('principal')(+event.target.value)} />
              </p>
            </div>
            <Label>Loan Term</Label>
            <LoanTerms onChange={(event) => this._updateField('term')(+event.target.value)} loanTerms={this.loanTerms} />
          </div>
        </div>
      </div>
    );
  };

}

const LoanTerms = ({loanTerms, ...rest}) => {
  return (
    <div className="field has-addons">
      <div className="control">
        <div className="select">
          <select {...rest}>
            {
              loanTerms.map((loanTerm, index) => <option key={index} value={loanTerm}>{loanTerm}</option>)
            }
          </select>
        </div>
      </div>
      <p className="control">
        <a className="button is-static">Year</a>
      </p>
    </div>
  );
}