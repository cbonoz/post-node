import React, { useState } from 'react';
import { api } from '../api/client';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    provinceOrState: '',
    postalOrZip: '',
    country: '',
    countryCode: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createContact(formData);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        provinceOrState: '',
        postalOrZip: '',
        country: '',
        countryCode: ''
      });
    } catch (error) {
      console.error('Failed to create contact:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label
            htmlFor={key}
            className="block text-sm font-medium text-gray-700"
          >
            {key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase())}
          </label>
          <input
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      ))}
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Contact
        </button>
      </div>
    </form>
  );
};
