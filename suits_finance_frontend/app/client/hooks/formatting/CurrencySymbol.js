function convertCurrencyToSymbol(currency = 'usd') {
  if (!currency) {
    return '€';
  }
  
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
    case 'rub':
      return '₽';
    case 'inr':
      return '₹';
    default:
      return '€';
  }
}

export default convertCurrencyToSymbol;