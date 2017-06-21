import { getMonthlyRate, getMortgagePayment, getMonthlyInterest, getMonthlyTaxRate } from '../mortgage';

describe('mortgage calculation', () => {
  const principal = 100000;
  const propertyValue = 100000;
  const rate = 3.92;
  const term = 30;
  const taxRate = {
    isPercentage: true,
    value: 5.6
  }

  it('should calculate the correct interest rate', () => {
    const result = getMortgagePayment(principal, rate, term);

    expect(result).toBe(472.81);
  });

  it('should calculate the correct amount of monthly interest', () => {
    const result = getMonthlyInterest(rate, principal);

    expect(result).toBe(326.67);
  });

  it('should calculate the correct monthly tax rate', () => {
    const result = getMonthlyTaxRate(propertyValue, taxRate);

    expect(result).toBe(466.67);
  });
})
