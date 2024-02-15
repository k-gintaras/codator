import fs from 'fs';

export function createAnyPrettyJsonFile(json: any) {
  const pretty = getPretyJsonStr(json);
  createAnyFile(pretty);
}

export function createPrettyJsonFile(json: any, fileName: string) {
  const pretty = getPretyJsonStr(json);
  createFile(pretty, fileName);
}

export function getPretyJsonStr(json: any) {
  return JSON.stringify(json, null, 2);
}

export function createFile(data: string, fileName: string) {
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('File created!');
  });
}

export function createAnyFile(data: string) {
  fs.writeFile('my-file.json', data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('File created!');
  });
}

export function getJSONFilePromise(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

export function getFilePromise(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}
