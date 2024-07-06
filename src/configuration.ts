import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { assign } from 'radash';

const filePath = join(__dirname, '../config', 'config.yml');
const envPath = join(__dirname, '../config', `config.${process.env.NODE_ENV ?? 'development'}.yml`);

const commonConfig = yaml.load(readFileSync(filePath, 'utf8'));
const envConfig = yaml.load(readFileSync(envPath, 'utf8'));

const configuration = () => {
  return assign(commonConfig, envConfig);
};

export default configuration;
