APP.transactions = (() => {
  'use strict';

  const API_BASE_URL = 'http://resttest.bench.co';
  const FIRST_TRANSACTIONS_PAGE = 1;

  const fetchTransactionsByPage = (page) => {
    const url = `${API_BASE_URL}/transactions/${page}.json`;

    return fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(err => err);
  };

  const fetchAllTransactions = () => {
    return new Promise((resolve, reject) => {
      let transactions = [];

      const fetchNextPage = (page) => {
        fetchTransactionsByPage(page)
          .then(data => handleData(data))
          .catch(err => reject(err));
      };

      const handleData = (data) => {
        transactions = transactions.concat(data.transactions);

        if (transactions.length < data.totalCount) {
          fetchNextPage(data.page + 1);
        } else {
          resolve(transactions);
        }
      };

      fetchNextPage(FIRST_TRANSACTIONS_PAGE);
    });
  };

  return {
    fetchAllTransactions
  };
})();
