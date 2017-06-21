import React, { Component } from 'react';
import { Label } from '../components/Bulma';

export default class MortgageCalculator extends Component {

  _canCalculate = () => {
    return this.state.term !== 0 && this.state.rate !== 0 && this.state.principal !== 0;
  }

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
        <div className="columns">
          <div className="column is-half">
            <div className="field">
              <Label>Principal</Label>
              <p className="control">
                <input type="number" className="input" onChange={(event) => this._updateField('principal')(+event.target.value)} />
              </p>
            </div>
            <LoanTerms onChange={(event) => this._updateField('term')(+event.target.value)} loanTerms={this.loanTerms} />
            <div className="field">
              <Label>Interest Rate</Label>
              <p className="control">
                <input type="number" className="input" onChange={(event) => this._updateField('rate')(+event.target.value)} />
              </p>
            </div>
          </div>
          <div className="column is-half">
            {
              this._canCalculate() ?  <PaymentInfo {...this.state} /> : <FinishForm />
            }
          </div>
        </div>
      </div>
    );
  };

}

const FinishForm = () => {
  return (
    <p>Complete the form by making sure Principal, Term, and Rate are populated!</p>
  );
}

const PaymentInfo = () => {
  return (
    <p>PaymentInfo</p>
  );
}

const LoanTerms = ({loanTerms, ...rest}) => {
  return (
    <div>
      <Label>Loan Term</Label>
      <div className="field has-addons">
        <div className="control">
          <div className="select">
            <select {...rest}>
              <option value="" default>Select...</option>
              {
                loanTerms.map((loanTerm, index) => <option key={index} value={loanTerm}>{loanTerm}</option>)
              }
            </select>
          </div>
        </div>
        <p className="control">
          <a className="button is-static">
            Years
          </a>
        </p>
      </div>
    </div>
  );
}