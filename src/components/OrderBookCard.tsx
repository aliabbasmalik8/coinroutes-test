import React, { FC } from 'react'
import { OrderBookParticipant } from '../utils/types'

export interface IOrderBookCard {
    price: number
    quantity: number
    type: OrderBookParticipant
}
const OrderBookCard: FC<IOrderBookCard> = ({ price, quantity, type }) => {
    return (
        <div className="border border-[rgba(255,255,255,0.2)] flex-1">
            <div
                className={`text-white ${type === OrderBookParticipant.BIDDER ? 'bg-blue-600' : 'bg-yellow-600'} p-2 pl-4 text-[20px]`}
            >
                <p>{type == OrderBookParticipant.BIDDER ? 'Bid' : 'Offer'}</p>
            </div>
            <div className="h-[100px] flex">
                <div className="flex justify-center align-middle items-center h-full flex-1">
                    <div className="">
                        <p className="text-white px-4">{price}</p>
                        <p className="text-white">Bid Price</p>
                    </div>
                </div>
                <div className="flex justify-center align-middle items-center h-full flex-1">
                    <div>
                        <p className="text-white px-4">{quantity}</p>
                        <p className="text-white">Bid Quantity</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderBookCard
