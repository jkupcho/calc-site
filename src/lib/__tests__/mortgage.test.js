import { getMonthlyRate, getMortgagePayment, getMonthlyInterest } from '../mortgage';

describe('mortgage calculation', () => {
  const principal = 100000;
  const rate = getMonthlyRate(3.92);
  const month = 1;
  const term = 30;

  it('should calculate the correct interest rate', () => {
    const result = getMortgagePayment(principal, rate, month, term);

    expect(result).toBe(472.81);
  });

  it('should calculate the correct amount of monthly interest', () => {
    const result = getMonthlyInterest(rate, principal);

    expect(result).toBe(326.67);
  });
})