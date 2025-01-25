import { requireEnv } from '../lib/util';

export const APP_PORT = parseInt(requireEnv('APP_PORT'));
export const DB_CONNECTION_STRING = requireEnv('DB_CONNECTION_STRING');
export const APP_ENV = requireEnv('APP_ENV');
export const IS_DEV = APP_ENV === 'dev';
export const POSTGRID_API_KEY = requireEnv('POSTGRID_API_KEY');
export const POSTGRID_WEBHOOK_SECRET = requireEnv('POSTGRID_WEBHOOK_SECRET');
export const BASE_SERVER_URL = requireEnv('BASE_SERVER_URL');
export const OPENAI_API_KEY = requireEnv('OPENAI_API_KEY');
