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
    const totalElement = document.querySelector('.transactions th:last-child');
    totalElement.textContent = APP.transactions.sumTransactions(transactions);

    const transactionsElement = document.querySelector('.transactions > tbody');
    transactionsElement.innerHTML = transactions.map(createTransactionItem).join('');
  };

  APP.transactions.fetchAllTransactions().then(transactions => updateTable(transactions));
})();
