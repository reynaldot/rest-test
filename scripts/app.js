APP.main = (() => {
  'use strict';

  const createTransactionItem = (transaction) => {
    return `
      <tr>
        <td>${transaction.Date}</td>
        <td>${transaction.Company}</td>
        <td>${transaction.Ledger}</td>
        <td>${APP.intl.numberFormatter(transaction.Amount)}</td>
      </tr>
    `;
  };

  const updateTable = (transactions) => {
    const totalElement = document.querySelector('.transactions th:last-child');
    const balance = APP.transactions.sumTransactions(transactions);
    totalElement.textContent = APP.intl.numberFormatter(balance);

    const transactionsElement = document.querySelector('.transactions > tbody');
    transactionsElement.innerHTML = transactions.map(createTransactionItem).join('');
  };

  APP.transactions.fetchAllTransactions().then(transactions => updateTable(transactions));
})();
