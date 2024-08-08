// capitalize first letter
const CapitalizeFirstLetter = (str) => {
  // clause to check if the string is empty
  if (!str) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default CapitalizeFirstLetter;