function _getNumberMonthlyPayments(term) {
  return term * 12;
}

function _round(num) {
  return Math.round(num * 100) / 100;
}

export const getMonthlyInterest = (rate, principal) => {
  return _round(rate * principal);
}

export const getMonthlyRate = (rate) => {
  return (rate / 12) / 100;
}

export const getMortgagePayment = (principal, rate, term) => {
  const monthlyPayments = _getNumberMonthlyPayments(term);
  return _round((rate / (1 - (Math.pow(1 + rate, -1 * monthlyPayments)))) * principal);
};