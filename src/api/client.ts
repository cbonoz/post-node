import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Cards
  createCard: async (title: string, content: string) => {
    const response = await apiClient.post('/cards', { title, content });
    return response.data;
  },
  getCards: async () => {
    const response = await apiClient.get('/cards');
    return response.data;
  },

  // Contacts
  createContact: async (contactData: any) => {
    const response = await apiClient.post('/contacts', contactData);
    return response.data;
  },

  // Sends
  createSend: async (cardId: number, contactId: string) => {
    const response = await apiClient.post('/sends', { cardId, contactId });
    return response.data;
  },
  getSends: async () => {
    const response = await apiClient.get('/sends');
    return response.data;
  },
};
