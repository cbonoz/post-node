import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable
} from 'kysely';

export interface CardTable {
  id: Generated<number>;
  title: string;
  content: string;
  userId: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AddressContactTable {
  id: Generated<number>;
  userId: string | null;
  contactId: string | null;
  firstName: string | null;
  lastName: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  phoneNumber: string | null;
  provinceOrState: string | null;
  postalOrZip: string | null;
  country: string | null;
  countryCode: string | null;
}
export interface CardSendTable {
  id: Generated<number>;
  cardId: number;
  contactId: string;
  userId: string;
  sentAt: number | null;
  status: string | null;
}

export interface Database {
  cards: CardTable;
  contacts: AddressContactTable;
  sends: CardSendTable;
}

export type Card = Selectable<CardTable>;
export type InsertableCard = Insertable<CardTable>;
export type UpdateableCard = Updateable<CardTable>;

export type AddressContact = Selectable<AddressContactTable>;
export type InsertableAddressContact = Insertable<AddressContactTable>;
export type UpdateableAddressContact = Updateable<AddressContactTable>;

export type CardSend = Selectable<CardSendTable>;
export type InsertableCardSend = Insertable<CardSendTable>;
export type UpdateableCardSend = Updateable<CardSendTable>;
