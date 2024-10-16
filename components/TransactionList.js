import React from 'react';

const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <li key={transaction.id} onClick={() => deleteTransaction(transaction.id)}>
          <span>{transaction.description}</span>
          <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
