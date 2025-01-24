// db.js
import pg from 'pg';
import Postgrator from 'postgrator';
import path from 'node:path';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from '../types/models';

import { DB_CONNECTION_STRING } from '../constants';

// Create pg client pool with connection string
const pgClient = new pg.Pool({
  connectionString: DB_CONNECTION_STRING
});

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: pgClient
  })
});

async function migrate() {
  try {
    await pgClient.connect();

    const postgrator = new Postgrator({
      migrationPattern: path.join(__dirname, '/migrations/*'),
      driver: 'pg',
      database: 'postai',
      schemaTable: 'migrations',
      currentSchema: 'public', // Postgres and MS SQL Server only
      execQuery: (query) => pgClient.query(query)
    });

    const result = await postgrator.migrate();

    if (result.length === 0) {
      console.log(
        'No migrations run for schema "public". Already at the latest one.'
      );
    }

    console.log('Migration done.');
    process.exitCode = 0;
  } catch (err) {
    console.error('Error migrating db', err);
    process.exitCode = 1;
  }
}

export { migrate, pgClient };
