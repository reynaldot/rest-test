APP.Main = ((Transactions, Intl) => {
  'use strict';

  const containerEl = document.querySelector('.container');

  const createLoader = (message) => {
    return `
      <div class="loader">${message}...</div>
    `;
  };

  const createError = (message) => {
    return `
      <div class="error">${message}</div>
    `;
  };

  const createTransactionsTable = (transactions = [], balance = 0) => {
    const emptyMessage = `
      <tr>
        <td colspan="4">We couldn't find any transactions.</td>
      </tr>
    `;

    const transactionRows = transactions.map((transaction) => {
      return `
        <tr>
          <td>${transaction.Date}</td>
          <td>${transaction.Company}</td>
          <td>${transaction.Ledger}</td>
          <td>${Intl.numberFormatter(transaction.Amount)}</td>
        </tr>
      `
    }).join('');

    return `
      <table class="table transactions">
        <thead>
          <tr>
            <th>Date</th>
            <th>Company</th>
            <th>Account</th>
            <th>${Intl.numberFormatter(balance)}</th>
          </tr>
        </thead>
        <tbody>
          ${transactionRows || emptyMessage}
        </tbody>
      </table>
    `
  };

  const handleTransactions = (transactions = []) => {
    const balance = Transactions.sumTransactions(transactions);
    containerEl.innerHTML = createTransactionsTable(transactions, balance);
  };

  const handleError = (err) => {
    containerEl.innerHTML = createError("We are having troubles loading your transactions.");
  };

  containerEl.innerHTML = createLoader("Loading Transactions");

  Transactions.fetchAllTransactions()
    .then(transactions => handleTransactions(transactions))
    .catch(err => handleError(err));
})(APP.Transactions, APP.Intl);
