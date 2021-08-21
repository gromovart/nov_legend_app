import fs from 'fs';
import util from 'util';

const readFilePromise = util.promisify(fs.readFile);

export const jsonToArrayCustom = async (filename: string): Promise<any> => {
  const json = await readFilePromise(filename, 'utf-8');
  const data: Array<string> = await JSON.parse(json);

  return data;
};
