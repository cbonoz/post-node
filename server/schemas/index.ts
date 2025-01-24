import { z } from 'zod'

export const createCardSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1)
})

export const createAddressSchema = z.object({
    recipientName: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipCode: z.string().min(1),
    country: z.string().min(1)
})

export const createSendSchema = z.object({
    cardId: z.number().positive(),
    addressId: z.number().positive()
})
