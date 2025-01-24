export interface Card {
    id: number
    title: string
    content: string
    userId: number
    createdAt?: string
    updatedAt?: string
}

export interface Address {
    id: number
    recipientName: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

export interface CardSends {
    id: number
    cardId: number
    addressId: number
    userId: number
    createdAt?: string
    updatedAt?: string
}

export interface PostGridLetter {
    id: string
    status: string
    expectedDeliveryDate: string
    tracking?: {
        carrier: string
        trackingNumber: string
    }
}
