APP.Intl = (() => {
  const DEFAULT_LOCALE = 'en-US';
  const DEFAULT_CURRENCY = 'USD';

  const currencyFormatter = (locale, currency) => {
    const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });

    return function (value) {
      return formatter.format(value);
    };
  };

  return {
    currencyFormatter: currencyFormatter(DEFAULT_LOCALE, DEFAULT_CURRENCY)
  };
})();
