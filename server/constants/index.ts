import { requireEnv } from '../lib/util';



export const APP_PORT = parseInt(requireEnv('APP_PORT'));
export const DB_CONNECTION_STRING = requireEnv('DB_CONNECTION_STRING');
