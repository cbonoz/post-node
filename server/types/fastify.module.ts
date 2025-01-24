import { authenticate } from '../lib/middleware';

// Type declaration for Fastify instance to include 'authenticate'
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
