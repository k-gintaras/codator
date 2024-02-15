export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isJSON(response: string) {
  try {
    const json = JSON.parse(response);
    return typeof json === 'object';
  } catch (error) {
    return false;
  }
}

export function isValidSimpleString(arg: string): boolean {
  // Check if the argument is not empty and does not contain forbidden symbols
  const forbiddenSymbols = ['"', "'", ';', '=', '<', '>', '`', '|', '$', '&'];
  return (
    arg.length > 0 && !forbiddenSymbols.some((symbol) => arg.includes(symbol))
  );
}

export function isValidSimpleStringOrNumber(str: string) {
  return isValidSimpleString(str) && isNumberOrString(str);
}

export function isValidString(str: string): boolean {
  return str.trim().length > 0;
}

export function isNumberOrString(str: string): boolean {
  return !isNaN(+str) || isValidString(str);
}

export function isValidSimpleStringArray(arr: string[]): boolean {
  return arr.every(isValidSimpleString);
}
