import React from 'react';

const Summary = ({ transactions }) => {
  const amounts = transactions.map(transaction => transaction.amount);
  
  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0)
    .toFixed(2);
  
  const expenses = (
    amounts.filter(amount => amount < 0).reduce((acc, amount) => (acc += amount), 0) * -1
  ).toFixed(2);

  const balance = (income - expenses).toFixed(2);

  return (
    <div className="summary">
      <h2>Balance: ${balance}</h2>
      <div>
        <div>Income: ${income}</div>
        <div>Expenses: ${expenses}</div>
      </div>
    </div>
  );
};

export default Summary;
