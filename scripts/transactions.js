APP.Transactions = (() => {
  'use strict';

  const API_BASE_URL = 'http://resttest.bench.co';
  const FIRST_TRANSACTIONS_PAGE = 1;
  const MAX_TRANSACTIONS = 100;

  /**
   * @typedef {Object} Transaction
   * @property {string} Date
   * @property {string} Company
   * @property {string} Ledger
   * @property {string} Amount
   *
   * @typedef {Object} TransactionPage
   * @property {number} totalCount
   * @property {number} page
   * @property {Array.<Transaction>} transactions
   */

  /**
   * Fetches a single transactions page from the API.
   *
   * @param {number} page - The transactions page index of interest.
   * @returns {Promise.<[TransactionPage]>} A promise with the requested transactions page.
   */
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

  /**
   * Fetches all transactions available from the API.
   *
   * This function assumes the API does not lie, meaning `totalCount` and `page`
   * of available transactions is always correct.
   *
   * This function also assumes a max number of transactions and will exit with a rejected
   * promise if the number of transactions fetched so far exceeds the maximum.
   *
   * @param {number} startPage
   * @returns {Promise.<Array.<Transaction>>}
   */
  const fetchAllTransactions = () => {
    return new Promise((resolve, reject) => {
      let transactions = [];

      const fetchNextPage = (page) => {
        fetchTransactionsByPage(page)
          .then(data => handleData(data))
          .catch(() => {
            // Note, additional HTTP errors could be handled here. For now we do the basics:
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

  /**
   * Adds all transaction amounts and returns the total sum.
   *
   * @param {Array.<Transaction>} transactions - The transactions we want to add up.
   * @returns {number} The total transactions balance. Zero the transactions array is empty or null.
   */
  const sumTransactions = (transactions = []) => {
    return transactions.reduce((acc, next) => {
      return acc + Number.parseFloat(next.Amount);
    }, 0); // assume zero as the inital balance.
  };

  return {
    fetchAllTransactions,
    sumTransactions
  };
})();
