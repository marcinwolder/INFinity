export default (str: string) => {
  str = str.toLowerCase();
  if (str.length !== 10) return false;
  let firstB = str.indexOf("b");
  firstB = firstB === -1 ? str.length : firstB;
  for (let i = 0; i < str.length; i++) {
    if (i < firstB && str[i] !== "a") return false;
    if (i >= firstB && str[i] !== "b") return false;
  }
  return true;
};
