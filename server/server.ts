import fastify from 'fastify';
import * as dotenv from 'dotenv';
dotenv.config();

import { APP_PORT } from './constants';
import { authenticate } from './lib/middleware';
import { migrate } from './db';
import { registerRoutes } from './routes';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: typeof authenticate;
  }

  // Extend FastifyRequest to include 'user' property
  interface FastifyRequest {
    user: {
      id: string;
      email: string;
    };
  }
}

// Initialize Fastify server
const app = fastify({ logger: true });

// Register a preHandler hook
app.decorate('authenticate', authenticate);

// Register routes
registerRoutes(app);

// Start the server
app.listen({ port: APP_PORT }, async (err, address) => {
  await migrate();
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server running at ${address}`);
});
