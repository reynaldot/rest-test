APP.transactions = (() => {
  'use strict';

  const FIRST_TRANSACTIONS_PAGE = 1;

  const mockTransactionPages = {
    1: {
      totalCount: 3,
      page: 1,
      transactions: [
        {
          Date: "Jan 8th, 2014",
          Company: "Adam's American Express",
          Ledger: "Adjusting Entry",
          Amount: "10,000.00"
        }
      ]
    },
    2: {
      totalCount: 3,
      page: 2,
      transactions: [
        {
          Date: "Jan 8th, 2010",
          Company: "MOMO SUSHI VANCOUVER BC",
          Ledger: "Interest Income",
          Amount: "5,000.00"
        }
      ]
    },
    3: {
      totalCount: 3,
      page: 3,
      transactions: [
        {
          Date: "Jan 3rd, 2009",
          Company: "Transaction - Bench.co",
          Ledger: "Employment Reimbursment",
          Amount: "2,000.00"
        }
      ]
    }
  };

  const fetchTransactionsByPage = (page) => {
    if (page in mockTransactionPages) {
      return Promise.resolve(mockTransactionPages[page]);
    } else {
      return Promise.reject(null);
    }
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
