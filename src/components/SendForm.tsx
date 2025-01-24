import React, { useState, useEffect } from 'react';
import { api } from '../api/client';

export const SendForm: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState('');
  const [contactId, setContactId] = useState('');

  useEffect(() => {
    const loadCards = async () => {
      const cardsData = await api.getCards();
      setCards(cardsData);
    };
    loadCards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createSend(Number(selectedCard), contactId);
      setSelectedCard('');
      setContactId('');
    } catch (error) {
      console.error('Failed to create send:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="card"
          className="block text-sm font-medium text-gray-700"
        >
          Select Card
        </label>
        <select
          id="card"
          value={selectedCard}
          onChange={(e) => setSelectedCard(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select a card</option>
          {cards.map((card) => (
            <option key={card.id} value={card.id}>
              {card.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="contactId"
          className="block text-sm font-medium text-gray-700"
        >
          Contact ID
        </label>
        <input
          id="contactId"
          type="text"
          value={contactId}
          onChange={(e) => setContactId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Send Card
      </button>
    </form>
  );
};
