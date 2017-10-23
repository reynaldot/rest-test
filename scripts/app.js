APP.main = (() => {
  'use strict';

  const createTransactionItem = (transaction) => {
    return `
      <tr>
        <td>${transaction.Date}</td>
        <td>${transaction.Company}</td>
        <td>${transaction.Ledger}</td>
        <td>${transaction.Amount}</td>
      </tr>
    `;
  };

  const updateTable = (transactions) => {
    const tbody = document.querySelector('.transactions > tbody');
    tbody.innerHTML = transactions.map(createTransactionItem).join('');
  };

  APP.transactions.fetchAllTransactions().then(transactions => updateTable(transactions));
})();
