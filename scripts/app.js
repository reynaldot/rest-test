APP.Main = ((Transactions, Intl) => {
  'use strict';

  const containerEl = document.querySelector('.container');

  /**
   * Creates a custom loader provided an input message string.
   *
   * @param {string} message
   * @returns {string}
   */
  const createLoader = (message) => {
    return `
      <div class="loader">${message}...</div>
    `;
  };

  /**
   * Creates a custom error message provided an input message string.
   *
   * @param {string} message - The error message to be displayed.
   * @returns {string}
   *
   * @todo: provide a "try again" button for users to recover from failure.
   */
  const createError = (message) => {
    return `
      <div class="error">${message}</div>
    `;
  };

  /**
   * Creates a new table with transactions data.
   *
   * @param {Array.<Object>} transactions
   * @param {number} balance
   * @returns {string}
   *
   * @todo: provide a "try again" button for users to re-fetch data.
   */
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
          <td>${transaction.Ledger || 'N/A'}</td>
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
    containerEl.innerHTML = createError(err.message);
  };

  const loadTransactions = () => {
    containerEl.innerHTML = createLoader("Loading Transactions");

    Transactions.fetchAllTransactions()
      .then(transactions => handleTransactions(transactions))
      .catch(err => handleError(err));
  };

  loadTransactions();

})(APP.Transactions, APP.Intl);
