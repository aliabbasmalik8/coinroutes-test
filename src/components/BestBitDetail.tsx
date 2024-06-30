import React, { FC } from 'react'
import OrderBookCard from './OrderBookCard'
import { IOrderBookPriceQuantity, OrderBookParticipant } from '../utils/types'

export interface IBestBidProps {
    bestBid: IOrderBookPriceQuantity
    bestOffer: IOrderBookPriceQuantity
}
export const BestBitDetail: FC<IBestBidProps> = ({ bestBid, bestOffer }) => {
    return (
        <div className="flex gap-8 mb-6">
            <OrderBookCard
                price={bestBid.price}
                quantity={bestBid.quantity}
                type={OrderBookParticipant.BIDDER}
            />
            <OrderBookCard
                price={bestOffer.price}
                quantity={bestOffer.quantity}
                type={OrderBookParticipant.OFFEROR}
            />
        </div>
    )
}

export default BestBitDetail
