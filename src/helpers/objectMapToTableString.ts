export function getObjectMapToTableString(
  headersString: string,
  mapObject: any
) {
  const pad = ' '; // space
  let table = '';
  const headersArr = headersString.split(',');

  // Calculate the length of the longest word among the headers and the data
  let longestPlayerLength = Math.max(
    ...Object.keys(mapObject).map((player) => player.length)
  );
  let longestHeaderLength = Math.max(
    ...headersArr.map((header) => header.length)
  );

  if (longestHeaderLength > longestPlayerLength) {
    // Transpose table: headers become rows, players become columns
    for (let i = 0; i < headersArr.length; i++) {
      let row = getPaddedWord(headersArr[i], pad, longestPlayerLength);
      for (const player in mapObject) {
        row +=
          ', ' +
          getPaddedWord(
            mapObject[player][i].toString(),
            pad,
            longestHeaderLength
          );
      }
      table += row + '\n';
    }
  } else {
    // Original table: headers become columns, players become rows
    table = headersString + '\n';
    for (const player in mapObject) {
      const paddedPlayer = getPaddedWord(player, pad, longestPlayerLength);
      const paddedData = mapObject[player].map((data: any) =>
        getPaddedWord(data.toString(), pad, longestHeaderLength)
      );
      table += `${paddedPlayer}, ${paddedData.join(', ')}\n`;
    }
  }

  return table;
}

function getPaddedWord(
  word: string,
  paddingString: string,
  targetLongestWord: number
): string {
  const paddingNeeded = targetLongestWord - word.length;
  return word + paddingString.repeat(paddingNeeded);
}

export function getMatrixToTableString(matrix: string[][]) {
  const pad = ' '; // space
  let table = '';

  // Calculate the length of the longest word in the matrix
  let longestWordLength = Math.max(...matrix.flat().map((word) => word.length));

  let longestHeaderLength = Math.max(
    ...matrix[0].map((header) => header.length)
  );
  let longestPlayerLength = Math.max(
    ...matrix
      .slice(1)
      .flat()
      .map((player) => player.length)
  );

  if (longestHeaderLength > longestPlayerLength) {
    // Transpose table: headers become rows, players become columns
    for (let i = 0; i < matrix[0].length; i++) {
      let row = getPaddedWord(matrix[0][i], pad, longestHeaderLength);
      for (let j = 1; j < matrix.length; j++) {
        row += ', ' + getPaddedWord(matrix[j][i], pad, longestPlayerLength);
      }
      table += row + '\n';
    }
  } else {
    // Original table: headers become columns, players become rows
    for (let i = 0; i < matrix.length; i++) {
      const paddedRow = matrix[i].map((word) =>
        getPaddedWord(word, pad, longestPlayerLength)
      );
      table += paddedRow.join(', ') + '\n';
    }
  }

  return table;
}
