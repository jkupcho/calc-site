function _getNumberMonthlyPayments(term) {
  return term * 12;
}

function _round(num) {
  return Math.round(num * 100) / 100;
}

export const getMonthlyInterest = (rate, principal) => {
  return _round(getMonthlyRate(rate) * principal);
}

export const getMonthlyRate = (rate) => {
  return (rate / 12) / 100;
}

export const getMortgagePayment = (principal, rate, term) => {
  const monthlyPayments = _getNumberMonthlyPayments(term);
  const monthyRate = getMonthlyRate(rate);
  return _round((monthyRate / (1 - (Math.pow(1 + monthyRate, -1 * monthlyPayments)))) * principal);
};