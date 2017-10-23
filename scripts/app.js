APP.Main = ((Transactions, Intl) => {
  'use strict';

  const createTransactionItem = (transaction) => {
    return `
      <tr>
        <td>${transaction.Date}</td>
        <td>${transaction.Company}</td>
        <td>${transaction.Ledger}</td>
        <td>${Intl.numberFormatter(transaction.Amount)}</td>
      </tr>
    `;
  };

  const updateTable = (transactions) => {
    const totalElement = document.querySelector('.transactions th:last-child');
    const balance = Transactions.sumTransactions(transactions);
    totalElement.textContent = Intl.numberFormatter(balance);

    const transactionsElement = document.querySelector('.transactions > tbody');
    transactionsElement.innerHTML = transactions.map(createTransactionItem).join('');
  };

  Transactions.fetchAllTransactions().then(transactions => updateTable(transactions));
})(APP.Transactions, APP.Intl);
