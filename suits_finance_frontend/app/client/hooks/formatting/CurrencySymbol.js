function convertCurrencyToSymbol(currency = 'usd') {
  // force the currency to be lowercase
  currency = currency.toLowerCase();

  switch (currency) {
    case 'usd':
      return '$';
    case 'eur':
      return '€';
    case 'gbp':
      return '£';
    case 'yen':
      return '¥';
    default:
      return '';
  }
}

export default convertCurrencyToSymbol;