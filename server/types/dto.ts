import { z } from 'zod';
import {
  createCardSchema,
  createContactSchema,
  createSendSchema
} from '../schemas';

// Type definitions for request bodies
export type CreateCardBody = z.infer<typeof createCardSchema>;
export type CreateContactBody = z.infer<typeof createContactSchema>;
export type CreateSendBody = z.infer<typeof createSendSchema>;
