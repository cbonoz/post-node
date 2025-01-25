import { FastifyReply } from 'fastify';

export const sendError = (reply: FastifyReply, error: Error | string | any) => {
  const message = error instanceof Error ? error.message : error;
  reply.status(500).send({ error: message || 'Unknown error occurred' });
};
