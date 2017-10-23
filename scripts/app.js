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
    console.assert(transactions.length === 3);
    console.assert(transactions[0].Amount === '10,000.00');
    console.assert(transactions[1].Amount === '5,000.00' );
    console.assert(transactions[2].Amount === '2,000.00' );

    const tbody = document.querySelector('.transactions > tbody');
    tbody.innerHTML = transactions.map(createTransactionItem).join('');
  };

  APP.transactions.fetchAllTransactions().then(transactions => updateTable(transactions));
})();
