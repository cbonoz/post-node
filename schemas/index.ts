import { z } from 'zod';

export const createCardSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
});

export const createContactSchema = z.object({
  userId: z.string().optional(),
  contactId: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  addressLine1: z.string().min(1),
  addressLine2: z.string().optional(),
  city: z.string().min(1),
  provinceOrState: z.string().min(1),
  postalOrZip: z.string().min(1),
  country: z.string().min(1),
  countryCode: z.string().min(1)
});

export const createSendSchema = z.object({
  userId: z.string().optional(),
  cardId: z.number().min(1),
  contactId: z.string().min(1)
});
