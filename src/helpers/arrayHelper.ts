export function divideIntoEqualFrequencyBins(
  arr: any[],
  numBins: number
): any[][] {
  const binSize = Math.ceil(arr.length / numBins);
  const result = [];

  for (let i = 0; i < numBins; i++) {
    const start = i * binSize;
    const end = start + binSize;
    result.push(arr.slice(start, end));
  }

  return result;
}

export function divideIntoFixedWidthBins(
  arr: any[],
  binWidth: number
): any[][] {
  let result = [];

  for (let i = 0; i < arr.length; i += binWidth) {
    result.push(arr.slice(i, i + binWidth));
  }

  return result;
}

function flattenArray(array: any[]): any[] {
  const flattenedArray: any[] = [];

  for (const item of array) {
    if (Array.isArray(item)) {
      flattenedArray.push(...flattenArray(item));
    } else {
      flattenedArray.push(item);
    }
  }

  return flattenedArray;
}

function addValueToObjectArray(array: any[], value: any): any[] {
  const modifiedArray: any[] = [];

  for (const object of array) {
    const modifiedObject = { ...object, value };
    modifiedArray.push(modifiedObject);
  }

  return modifiedArray;
}
