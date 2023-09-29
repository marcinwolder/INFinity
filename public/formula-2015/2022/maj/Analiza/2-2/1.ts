export default (str: string) => {
  const log = { a: 0, b: 0 };
  for (const letter of str) {
    log[letter as "a" | "b"]++;
    if (log.a > log.b) return false;
  }
  if (log.a !== 5 || log.b !== 5) return false;
  return true;
};
