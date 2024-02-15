import { config } from 'dotenv';

config();

/**
 *
 * @param key
 * @returns keyValue from .env
 * @use
 * import getEnvVariable from './path-to-your-getEnvVariable-file';
 * const authKey = getEnvVariable('AUTH_KEY');
 */
const getEnvVariable = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }

  return value;
};

export default getEnvVariable;
