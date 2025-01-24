import { requireEnv } from '../lib/util';



export const APP_PORT = parseInt(requireEnv('APP_PORT'));
export const DB_CONNECTION_STRING = requireEnv('DB_CONNECTION_STRING');
export const JWT_SECRET = requireEnv('JWT_SECRET');
export const APP_ENV = requireEnv('APP_ENV');
export const IS_DEV = APP_ENV === 'dev';
export const POSTGRID_API_KEY = requireEnv('POSTGRID_API_KEY');
