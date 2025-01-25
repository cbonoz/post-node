CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    contactId TEXT,
    userId uuid,
    firstName TEXT,
    lastName TEXT,
    addressLine1 TEXT,
    addressLine2 TEXT,
    city TEXT,
    provinceOrState TEXT,
    postalOrZip TEXT,
    country TEXT,
    countryCode TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    userId uuid,
    title TEXT,
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sends (
    id SERIAL PRIMARY KEY,
    senderUserId uuid,
    contactId INTEGER REFERENCES contacts(id),
    cardId INTEGER REFERENCES cards(id),
    status TEXT,
    sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--indexes
CREATE INDEX idx_card_user_id ON cards(userId);
CREATE INDEX idx_contact_id ON sends(contactId);
CREATE INDEX idx_card_id ON sends(cardId);
CREATE INDEX idx_contact_user_id ON contacts(userId);
--sender
CREATE INDEX idx_sender_user_id ON sends(senderUserId);
