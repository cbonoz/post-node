CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    recipientName VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipCode VARCHAR(20) NOT NULL,
    country VARCHAR(255) NOT NULL
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    title TEXT,
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sends (
    id SERIAL PRIMARY KEY,
    senderUserId INTEGER REFERENCES users(id),
    addressId INTEGER REFERENCES addresses(id),
    cardId INTEGER REFERENCES cards(id),
    sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--indexes
CREATE INDEX idx_user_id ON cards(userId);
CREATE INDEX idx_address_id ON sends(addressId);
CREATE INDEX idx_card_id ON sends(cardId);
--sender
CREATE INDEX idx_sender_user_id ON sends(senderUserId);
