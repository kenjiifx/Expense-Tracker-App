import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [theme, setTheme] = useState('dark'); 

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const addTransaction = (e) => {
    e.preventDefault();
    const newTransaction = { description, amount: parseFloat(amount) };
    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount('');
  };

  const deleteTransaction = (index) => {
    const newTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(newTransactions);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome + totalExpense;

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1>Expense Tracker</h1>
        <h2>Balance: ${balance.toFixed(2)}</h2>
        <div className="summary">
          <div>Total Income: ${totalIncome.toFixed(2)}</div>
          <div>Total Expense: ${totalExpense.toFixed(2)}</div>
        </div>
      </header>

      <form onSubmit={addTransaction}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (positive for income, negative for expense)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Transaction</button>
      </form>

      <ul className="transaction-list">
        {transactions.map((transaction, index) => (
          <li key={index} onClick={() => deleteTransaction(index)}>
            <span>{transaction.description}</span>
            <span>{transaction.amount}</span>
          </li>
        ))}
      </ul>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌞' : '🌙'}
      </button>
    </div>
  );
}

export default App;
