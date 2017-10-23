APP.Transactions = (() => {
  'use strict';

  const API_BASE_URL = 'http://resttest.bench.co';
  const FIRST_TRANSACTIONS_PAGE = 1;
  const MAX_TRANSACTIONS = 100;

  const fetchTransactionsByPage = (page) => {
    const url = `${API_BASE_URL}/transactions/${page}.json`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => data);
  };

  const fetchAllTransactions = () => {
    return new Promise((resolve, reject) => {
      let transactions = [];

      const fetchNextPage = (page) => {
        fetchTransactionsByPage(page)
          .then(data => handleData(data))
          .catch(err => {
            // Note additional HTTP errors could be handled here. For now we do the basics:
            reject(new Error('An error occurred when loading your transactions.'));
          });
      };

      const handleData = (transactionPage) => {
        transactions = transactions.concat(transactionPage.transactions);

        if (transactions.length > MAX_TRANSACTIONS) {
          reject(new Error('We were not able to load all your transactions.'));
        } else if (transactions.length < transactionPage.totalCount) {
          fetchNextPage(transactionPage.page + 1);
        } else {
          resolve(transactions);
        }
      };

      fetchNextPage(FIRST_TRANSACTIONS_PAGE);
    });
  };

  const sumTransactions = (transactions = []) => {
    return transactions.reduce((acc, next) => {
      return acc + Number.parseFloat(next.Amount);
    }, 0); // assume zero as the inital balance.
  }

  return {
    fetchAllTransactions,
    sumTransactions
  };
})();
