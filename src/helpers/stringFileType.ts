export function isJSON(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export function isCSV(str: string): boolean {
  // Split the string into lines
  const lines = str.split('\n');

  // A CSV should have at least one line
  if (lines.length < 1) return false;

  // Check if there are commas in the first line
  const firstLine = lines[0];
  if (!firstLine.includes(',')) return false;

  // Count the commas in the first line
  const commaCount = (firstLine.match(/,/g) || []).length;

  // Check that all lines have the same number of commas
  for (const line of lines) {
    const lineCommaCount = (line.match(/,/g) || []).length;
    if (lineCommaCount !== commaCount) return false;
  }

  // Check that we can parse the values from each line
  try {
    for (const line of lines) {
      const values = line.split(',');
      if (!values || values.length !== commaCount + 1) return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}

export function getStringDataType(str: string) {
  if (isJSON(str)) {
    return 'json';
  } else if (isCSV(str)) {
    return 'csv';
  } else {
    return 'txt';
  }
}
