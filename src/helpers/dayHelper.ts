// Helper function to check if two timestamps belong to the same day
export function isSameDayS(ts1: number, ts2: number): boolean {
  const date1 = new Date(ts1 * 1000); // Convert UNIX timestamp to JavaScript timestamp
  const date2 = new Date(ts2 * 1000);

  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}

export function isSameDayMs(ts1: number, ts2: number): boolean {
  const date1 = new Date(ts1); // Convert UNIX timestamp to JavaScript timestamp
  const date2 = new Date(ts2);

  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}

export function isWithinHours(ts1: number, ts2: number, n: number): boolean {
  const diffInMs = Math.abs(ts1 - ts2);
  const hours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours

  return hours <= n;
}

// Function to get the date string in the format of YYYY-MM-DD
export function getDateStringFromS(timestamp: number) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth is zero-based
  const day = date.getDate(); // getDate is one-based
  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;
}

// Function to get the date string in the format of YYYY-MM-DD
export function getDateStringFromMs(timestamp: number) {
  const date = new Date(timestamp); // Convert to milliseconds
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth is zero-based
  const day = date.getDate(); // getDate is one-based
  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`;
}

export function isDayOld(unixTime: number) {
  const currentTime = Date.now(); // Current time in milliseconds since 1970
  const oneDayInMs = 24 * 60 * 60 * 1000; // One day in milliseconds
  return currentTime - unixTime >= oneDayInMs;
}
