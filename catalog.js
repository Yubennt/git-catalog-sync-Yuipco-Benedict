function isValidLoan(daysLate) {
  return daysLate >= 0;
}

function calculateLateFee(daysLate, ratePerDay) {
  if (daysLate <= 1) return 0;
  const fee = Math.round(daysLate * ratePerDay);
  return Math.min(20, Math.max(1, fee));
}

module.exports = { isValidLoan, calculateLateFee };
