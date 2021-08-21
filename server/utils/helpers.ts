import fs from 'fs';
import util from 'util';
import { S2CellId, S2LatLng } from 'nodes2ts';

const readFilePromise = util.promisify(fs.readFile);

export const jsonToArrayCustom = async (filename: string): Promise<any> => {
  const json = await readFilePromise(filename, 'utf-8');
  const data: Array<string> = await JSON.parse(json);

  return data;
};

const s2IdToPath = (key: any): string => {
  let decimal = key.toString(2);

  // Убираем последнюю единицу см. алгоритм s2 geometry
  decimal = decimal.replace(/10*$/g, '');
  let pairs = decimal.match(/(..?)/g);
  if (pairs === null) {
    pairs = [];
  }

  return pairs.map((i) => parseInt(i, 2)).join('');
};

export const latLongToS2Path = (lat: number, long: number): string => {
  const point = S2CellId.fromPoint(S2LatLng.fromDegrees(lat, long).toPoint());
  return s2IdToPath(point.id);
};
