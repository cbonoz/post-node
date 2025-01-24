import { Contact } from 'postgrid-node-client/build/contact';
import { AddressContact } from '../types/models';

export const createContactFromAddress = (address: AddressContact): Contact => {
  return {
    id: address.contactId!,
    object: 'contact',
    live: true,
    addressStatus: 'valid',
    firstName: address.firstName!,
    lastName: address.lastName!,
    addressLine1: address.addressLine1!,
    addressLine2: address.addressLine2 || '',
    city: address.city!,
    provinceOrState: address.provinceOrState || '',
    postalOrZip: address.postalOrZip || '',
    country: address.country || '',
    countryCode: address.countryCode || '',
    phoneNumber: address.phoneNumber || ''
  };
};
