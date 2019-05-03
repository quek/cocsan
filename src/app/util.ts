export function d(x: object) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seen: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const replacer = function(key: string, value: any) {
    if (key === '_reactInternalFiber') {
      return;
    }
    if (value !== null && typeof value === 'object') {
      if (seen.indexOf(value) >= 0) {
        return;
      }
      seen.push(value);
    }
    return value;
  };
  return JSON.stringify(x, replacer, 2);
}
