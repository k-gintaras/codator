export function isPotentiallyMalicious(str: string): boolean {
  // Make the string lower case for comparison
  str = str.toLowerCase();

  // Array of keywords that could indicate malicious intent
  const patterns = [
    '<script',
    ' select ',
    ' drop ',
    ' delete ',
    ' insert ',
    ' update ',
    ' where ',
    ' and ',
    ' or ',
    '-- ',
  ];

  for (const keyword of patterns) {
    if (str.includes(keyword)) {
      return true;
    }
  }

  return false;
}
