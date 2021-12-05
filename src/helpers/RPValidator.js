export const isValidField = (value, regex) => {
    if (value == undefined || !value) {
      return false;
    }
    let data = value;
    if (!regex) {
      return true;
    } else {
      let re = new RegExp(regex);
      return re.test(data);
    }
  };