import React, { Component } from 'react';
import { Label } from '../components/Bulma';
import { getMortgagePayment } from '../lib/mortgage';

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
            <NumberInput label="Principal" value={this.state.principal} onChange={(event) => this._updateField('principal')(+event.target.value)} />
            <LoanTerms selectValue={this.state.term} onChange={(event) => this._updateField('term')(+event.target.value)} loanTerms={this.loanTerms} />
            <NumberInput label="Interest Rate" value={this.state.rate} onChange={(event) => this._updateField('rate')(+event.target.value)} />
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

const PaymentInfo = ({principal, rate, term}) => {
  const mortgagePayment = getMortgagePayment(principal, rate, term);
  return (
    <div>
      <h2 className="subtitle">Monthly Payment</h2>
      <h1 className="title">${mortgagePayment}</h1>
    </div>
  );
}

const NumberInput = ({label, value, onChange}) => {
  return (
    <div className="field">
      <Label>{label}</Label>
      <p className="control">
        <input type="number" className="input" onChange={onChange} defaultValue={value} />
      </p>
    </div>
  );
}

const LoanTerms = ({loanTerms, ...rest}) => {
  return (
    <div>
      <Label>Loan Term</Label>
      <div className="field has-addons">
        <div className="control">
          <div className="select">
            <select onChange={rest.onChange} defaultValue={rest.selectValue}>
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