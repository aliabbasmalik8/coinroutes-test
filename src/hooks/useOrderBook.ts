import { useEffect, useState } from 'react'
import {
    IOrderBook,
    IOrderBookPriceQuantity,
    OrderBookParticipant,
} from '../utils/types'

export const useOrderBook = () => {
    const [orderBookData, setOrderBookData] = useState<IOrderBook[]>([])
    const [bestBid, setBestBid] = useState<IOrderBookPriceQuantity>({
        price: 0,
        quantity: 0,
    })
    const [bestOffer, setBestOffer] = useState<IOrderBookPriceQuantity>({
        price: 0,
        quantity: 0,
    })
    const [offers, setOffer] = useState<IOrderBookPriceQuantity[]>([])
    const [bids, setBid] = useState<IOrderBookPriceQuantity[]>([])
    useEffect(() => {
        const newOffer: IOrderBookPriceQuantity[] = []
        const newBid: IOrderBookPriceQuantity[] = []
        let newBestOffer: IOrderBookPriceQuantity | null = null
        const newBestBid: IOrderBookPriceQuantity = { price: 0, quantity: 0 }
        orderBookData.map((orderBook) => {
            if (!orderBook) return
            const orderBookPrice = Number(orderBook.price_level)
            const orderBookQuantity = Number(orderBook.new_quantity)
            if (orderBook.side === OrderBookParticipant.BIDDER) {
                newBid.push({
                    price: orderBookPrice,
                    quantity: orderBookQuantity,
                })
                if (orderBook && orderBookPrice > newBestBid.price) {
                    newBestBid.price = orderBookPrice
                    newBestBid.quantity = orderBookQuantity
                }
            }
            if (orderBook.side === OrderBookParticipant.OFFEROR) {
                newOffer.push({
                    price: orderBookPrice,
                    quantity: orderBookQuantity,
                })
                if (orderBook && !newBestOffer) {
                    newBestOffer = {
                        price: orderBookPrice,
                        quantity: orderBookQuantity,
                    }
                } else if (
                    orderBook &&
                    newBestOffer &&
                    orderBookPrice < newBestOffer.price
                ) {
                    newBestOffer.price = orderBookPrice
                    newBestOffer.quantity = orderBookQuantity
                }
            }
        })
        setOffer(newOffer)
        setBid(newBid)
        setBestBid(newBestBid)
        if (newBestOffer) setBestOffer(newBestOffer)
    }, [orderBookData])
    return { bestBid, bestOffer, offers, bids, orderBookData, setOrderBookData }
}
