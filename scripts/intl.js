APP.intl = (() => {
  const DEFAULT_LOCALE = 'en-US';
  const DEFAULT_CURRENCY = 'USD';

  const numberFormatter = (locale, currency) => {
    const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });

    return function (value) {
      return formatter.format(value);
    }
  };

  return {
    numberFormatter: numberFormatter(DEFAULT_LOCALE, DEFAULT_CURRENCY)
  };
})();
