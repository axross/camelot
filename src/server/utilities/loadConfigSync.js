/* @flow */
import fs from 'fs';
import path from 'path';
import toml from 'toml';

const loadConfigSync = (environment: string): Object => {
  const filepath = path.resolve(__dirname, `../configs/${environment}.toml`);
  const data = fs.readFileSync(filepath, 'utf8');

  return toml.parse(data);
};

export default loadConfigSync;
