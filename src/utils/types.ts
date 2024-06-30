export enum OrderBookParticipant {
    BIDDER = 'bid',
    OFFEROR = 'offer',
}
export interface IOrderBook {
    side: OrderBookParticipant
    event_time: string
    price_level: string
    new_quantity: string
}

export interface IOrderBookPriceQuantity {
    price: number
    quantity: number
}
