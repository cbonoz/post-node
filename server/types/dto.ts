import { z } from 'zod'
import { createCardSchema, createAddressSchema, createSendSchema } from '../schemas'

// Type definitions for request bodies
export type CreateCardBody = z.infer<typeof createCardSchema>
export type CreateAddressBody = z.infer<typeof createAddressSchema>
export type CreateSendBody = z.infer<typeof createSendSchema>
