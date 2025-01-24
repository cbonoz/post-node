import { FastifyInstance } from 'fastify';
import { db } from '../db';
import {
  CreateContactBody,
  CreateCardBody,
  CreateSendBody
} from '../types/dto';
import {
  createCardSchema,
  createContactSchema,
  createSendSchema
} from '../schemas';
import { sendPostcard } from '../services/postgrid';
import { createContactFromAddress } from '../services/converters';
import { sendError } from '../lib/util/errors';

export async function registerRoutes(app: FastifyInstance) {
  app.post<{
    Body: CreateCardBody;
  }>(
    '/cards',
    {
      preHandler: app.authenticate,
      schema: {
        body: createCardSchema
      }
    },
    async (request, reply) => {
      try {
        const { title, content } = request.body;
        const userId = request.user.id;

        const card = await db
          .insertInto('cards')
          .values({
            title,
            content,
            userId
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        reply.send(card);
      } catch (error) {
        sendError(reply, error);
      }
    }
  );

  app.get(
    '/cards',
    { preHandler: app.authenticate },
    async (request, reply) => {
      try {
        const userId = request.user.id;
        const cards = await db
          .selectFrom('cards')
          .selectAll()
          .where('userId', '=', userId)
          .orderBy('createdAt', 'desc')
          .execute();

        reply.send(cards);
      } catch (error) {
        sendError(reply, error);
      }
    }
  );

  app.post<{
    Body: CreateContactBody;
  }>(
    '/contacts',
    {
      preHandler: app.authenticate,
      schema: {
        body: createContactSchema
      }
    },
    async (request, reply) => {
      try {
        const contact = await db
          .insertInto('contacts')
          .values({
            ...request.body,
            userId: request.user.id
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        reply.send(contact);
      } catch (error) {
        sendError(reply, error);
      }
    }
  );

  app.post<{
    Body: CreateSendBody;
  }>(
    '/sends',
    {
      preHandler: app.authenticate,
      schema: {
        body: createSendSchema
      }
    },
    async (request, reply) => {
      try {
        const { cardId, contactId } = request.body;
        const userId = request.user.id;

        // Get card and contact details
        const card = await db
          .selectFrom('cards')
          .selectAll()
          .where('id', '=', cardId)
          .where('userId', '=', userId)
          .executeTakeFirst();

        if (!card) {
          reply.status(404).send({ error: 'Card not found' });
          return;
        }

        const toContact = await db
          .selectFrom('contacts')
          .selectAll()
          .where('contactId', '=', contactId)
          .executeTakeFirst();

        if (!toContact) {
          reply.status(404).send({ error: 'Contact recipient not found' });
          return;
        }

        const fromContact = await db
          .selectFrom('contacts')
          .selectAll()
          .where('userId', '=', userId)
          .executeTakeFirst();

        if (!fromContact) {
          reply.status(404).send({ error: 'From contact not found' });
          return;
        }

        // Send via PostGrid
        const letter = await sendPostcard(
          card.title,
          card.content,
          createContactFromAddress(fromContact),
          createContactFromAddress(toContact)
        );

        // Record the send
        const send = await db
          .insertInto('sends')
          .values({
            cardId,
            contactId,
            userId
          })
          .returningAll()
          .executeTakeFirstOrThrow();

        reply.send({
          ...send
        });
      } catch (error) {
        sendError(reply, error);
      }
    }
  );

  app.get(
    '/sends',
    { preHandler: app.authenticate },
    async (request, reply) => {
      try {
        const userId = request.user.id;
        const sends = await db
          .selectFrom('sends')
          .innerJoin('cards', 'cards.id', 'sends.cardId')
          .innerJoin('contacts', 'contacts.id', 'sends.contactId')
          .selectAll()
          .where('sends.userId', '=', userId)
          .orderBy('sends.sentAt', 'desc')
          .execute();

        reply.send(sends);
      } catch (error) {
        sendError(reply, error);
      }
    }
  );
}
