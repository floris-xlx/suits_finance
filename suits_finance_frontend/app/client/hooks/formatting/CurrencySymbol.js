function convertCurrencyToSymbol(currency) {
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