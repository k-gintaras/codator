const { Readable } = require('stream');

export function getStringAsStream(str: string) {
  return Readable.from(str);
}
