module.exports = {
  validateTextInput: (text) => {
    if (text.charAt(0) === " " || text.charAt(text.length - 1) === " ") {
      return false;
    }
    return true;
  },
  validatePhone: (number) => {
    return Number(number) && number.length === 10;
  },
  validateUsername: (text) => {
    if (text.length < 4) return false;
    return true;
  },
  validatePassword: (text) => {
    if (text.length < 8) return false;
    return true;
  },
};
