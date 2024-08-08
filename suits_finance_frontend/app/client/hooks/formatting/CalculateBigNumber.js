export default function formatBigNumber(number) {
  const absNumber = Math.abs(number);
  const sign = number < 0 ? '-' : '';

  if (absNumber >= 1000 && absNumber < 10000) {
    return sign + (absNumber / 1000).toFixed(2) + 'k';
  } else if (absNumber >= 10000 && absNumber < 100000) {
    return sign + Math.round(absNumber / 1000) + 'k';
  } else if (absNumber >= 100000 && absNumber < 1000000) {
    return sign + (absNumber / 1000).toFixed(1) + 'k';
  } else if (absNumber >= 1000000 && absNumber < 1000000000) {
    return sign + (absNumber / 1000000).toFixed(2) + 'M';
  } else if (absNumber >= 1000000000 && absNumber < 1000000000000) {
    return sign + (absNumber / 1000000000).toFixed(2) + 'B';
  } else if (absNumber >= 1000000000000) {
    return sign + (absNumber / 1000000000000).toFixed(2) + 'T';
  } else {
    return number;
  }
}


