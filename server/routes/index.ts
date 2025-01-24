import { FastifyInstance } from 'fastify'
import { pgClient } from '../db'
import { CreateAddressBody, CreateCardBody, CreateSendBody } from '../types/dto'
import { createCardSchema, createAddressSchema, createSendSchema } from '../schemas'
import { sendPostcard } from '../services/postgrid'

export async function registerRoutes(app: FastifyInstance) {
    app.post<{
        Body: CreateCardBody
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
                const { title, content } = request.body
                const userId = request.user.id

                const [card] = await pgClient`
                    INSERT INTO cards (title, content, userId)
                    VALUES (${title}, ${content}, ${userId})
                    RETURNING *
                `
                reply.send(card)
            } catch (error) {
                reply.status(500).send({ error: error.message })
            }
        }
    )

    app.get(
        '/cards',
        { preHandler: app.authenticate },
        async (request, reply) => {
            try {
                const userId = request.user.id
                const cards = await pgClient`
                    SELECT * FROM cards
                    WHERE userId = ${userId}
                    ORDER BY createdAt DESC
                `
                reply.send(cards)
            } catch (error) {
                reply.status(500).send({ error: error.message })
            }
        }
    )

    app.post<{
        Body: CreateAddressBody
    }>(
        '/addresses',
        {
            preHandler: app.authenticate,
            schema: {
                body: createAddressSchema
            }
        },
        async (request, reply) => {
            try {
                const { recipientName, street, city, state, zipCode, country } = request.body

                const [address] = await pgClient`
                    INSERT INTO addresses (recipientName, street, city, state, zipCode, country)
                    VALUES (${recipientName}, ${street}, ${city}, ${state}, ${zipCode}, ${country})
                    RETURNING *
                `
                reply.send(address)
            } catch (error) {
                reply.status(500).send({ error: error.message })
            }
        }
    )

    app.post<{
        Body: CreateSendBody
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
                const { cardId, addressId } = request.body
                const userId = request.user.id

                // Get card and address details
                const [card] = await pgClient`
                    SELECT * FROM cards WHERE id = ${cardId} AND userId = ${userId}
                `
                if (!card) {
                    reply.status(404).send({ error: 'Card not found' })
                    return
                }

                const [address] = await pgClient`
                    SELECT * FROM addresses WHERE id = ${addressId}
                `
                if (!address) {
                    reply.status(404).send({ error: 'Address not found' })
                    return
                }

                const fromContact = 

                // Send via PostGrid
                const letter = await sendPostcard(card.title, card.content, fromContact, toContact)

                // Record the send
                const [send] = await pgClient`
                    INSERT INTO sends (
                        senderUserId,
                        addressId,
                        cardId,
                        postGridId,
                        status,
                        expectedDeliveryDate
                    )
                    VALUES (
                        ${userId},
                        ${addressId},
                        ${cardId},
                        ${letter.id},
                        ${letter.status},
                        ${letter.expectedDeliveryDate}
                    )
                    RETURNING *
                `

                reply.send({
                    ...send,
                    tracking: letter.tracking,
                    status: letter.status,
                    expectedDeliveryDate: letter.expectedDeliveryDate
                })
            } catch (error) {
                reply.status(500).send({ error: error.message })
            }
        }
    )

    app.get(
        '/sends',
        { preHandler: app.authenticate },
        async (request, reply) => {
            try {
                const userId = request.user.id
                const sends = await pgClient`
                    SELECT s.*, c.title, c.content, a.*
                    FROM sends s
                    JOIN cards c ON s.cardId = c.id
                    JOIN addresses a ON s.addressId = a.id
                    WHERE s.senderUserId = ${userId}
                    ORDER BY s.sentAt DESC
                `
                reply.send(sends)
            } catch (error) {
                reply.status(500).send({ error: error.message })
            }
        }
    )
}
