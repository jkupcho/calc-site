import React, { Component } from 'react';
import { Label, NumberInput } from '../components/Bulma';
import { getMortgagePayment, getMonthlyTaxRate, round } from '../lib/mortgage';

export default class MortgageCalculator extends Component {

  constructor(props) {
    super(props);

    this.loanTerms = [10, 15, 20, 25, 30, 40];

    this.state = {
      propertyValue: 0,
      term: 0,
      rate: 0,
      downPayment: 0,
      taxRate: {
        isPercentage: true,
        value: 0
      }
    };
  }

  _calculatePrincipal = () => {
    return this.state.propertyValue - this.state.downPayment;
  }

  _canCalculate = () => {
    return this.state.term !== 0 && this.state.rate !== 0 && this.state.propertyValue !== 0;
  }

  _updateField = (field) => {
    return (value) => {
      this.setState({
        [field]: value
      });
    };
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-half">
            <NumberInput label="Property Value" value={this.state.propertyValue} onChange={(event) => this._updateField('propertyValue')(+event.target.value)} />
            <LoanTerms selectValue={this.state.term} onChange={(event) => this._updateField('term')(+event.target.value)} loanTerms={this.loanTerms} />
            <NumberInput label="Down Payment" value={this.state.downPayment} onChange={(event) => this._updateField('downPayment')(+event.target.value)} />
            <NumberInput label="Interest Rate" value={this.state.rate} onChange={(event) => this._updateField('rate')(+event.target.value)} />
            <TaxRate taxRate={this.state.taxRate} onChange={this._updateField('taxRate')} />
          </div>
          <div className="column is-half">
            {
              this._canCalculate() ?  <PaymentInfo {...this.state} principal={this._calculatePrincipal()}/> : <FinishForm />
            }
          </div>
        </div>
      </div>
    );
  };

}

const FinishForm = () => {
  return (
    <p>Complete the form by making sure Property Value, Term, and Rate are populated!</p>
  );
}

const TaxRate = ({taxRate, ...rest}) => {

  function _updateTaxRate(field) {
    return (value) => {
      rest.onChange({
        ...taxRate,
        [field]: value
      })
    }
  }

  return (
    <div>
      <Label>Tax Rate</Label>
      <div className="field has-addons">
        <p className="control">
          <span className="select">
            <select onChange={(event) => _updateTaxRate('isPercentage')(event.target.value === 'true')} defaultValue={taxRate.isPercentage}>
              <option value="false">$</option>
              <option value="true">%</option>
            </select>
          </span>
        </p>
        <p className="control is-expanded">
          <input type="number" className="input" onChange={(event) => _updateTaxRate('value')(+event.target.value)} defaultValue={taxRate.value} />
        </p>
      </div>
    </div>
  );
}

const PaymentInfo = ({principal, rate, term, propertyValue, taxRate}) => {
  const mortgagePayment = getMortgagePayment(principal, rate, term);
  const monthlyTaxes = getMonthlyTaxRate(propertyValue, taxRate);
  const totalMonthlyCost = round(mortgagePayment + monthlyTaxes);

  return (
    <div className="has-text-centered">
      <div className="section">
        <h2 className="subtitle is-3">Monthly Payment</h2>
        <h1 className="title is-1">${totalMonthlyCost}</h1>
      </div>
      <div className="columns">
        <div className="column is-half">
          <h2 className="subtitle is-4">Mortgage Cost</h2>
          <h1 className="title is-3">${mortgagePayment}</h1>
        </div>
        <div className="column is-half">
          <h2 className="subtitletitle is-4">Monthly Tax</h2>
          <h1 className="title is-3">${monthlyTaxes}</h1>
        </div>
      </div>
    </div>
  );
}

const LoanTerms = ({loanTerms, ...rest}) => {
  return (
    <div>
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