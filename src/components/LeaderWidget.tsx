import React, { FC, useEffect, useState } from 'react'
import { IOrderBook, IOrderBookPriceQuantity } from '../utils/types'
import { filterAndSortData, aggregateData } from '../utils/utils'
export interface ILeaderWidgetProps {
    data: IOrderBook[]
    offers: IOrderBookPriceQuantity[]
    bids: IOrderBookPriceQuantity[]
}
export const LeaderWidget: FC<ILeaderWidgetProps> = ({ bids, offers }) => {
    const [aggregation, setAggregation] = useState(0.01)
    const [topBids, setTopBids] = useState<
        { price: number; quantity: number }[]
    >([])
    const [topOffers, setTopOffers] = useState<
        { price: number; quantity: number }[]
    >([])

    useEffect(() => {
        let aggregatedBids = aggregateData(bids, aggregation)
        aggregatedBids = filterAndSortData(aggregatedBids, false)
        aggregatedBids = aggregatedBids.slice(0, 10)
        setTopBids(aggregatedBids)

        let aggregatedOffers = aggregateData(offers, aggregation)
        aggregatedOffers = filterAndSortData(aggregatedOffers, true)
        aggregatedOffers = aggregatedOffers.slice(0, 10)
        setTopOffers(aggregatedOffers)
    }, [bids, offers, aggregation])
    const incrementAggregationHandler = () => {
        const aggregation_value =
            aggregation === 0.01 ? 0.05 : aggregation + 0.05
        setAggregation(Number(aggregation_value.toFixed(2)))
    }
    const decrementAggregation = () => {
        if (aggregation === 0.01) return
        const aggregation_value =
            aggregation === 0.05 ? 0.01 : aggregation - 0.05
        setAggregation(Number(aggregation_value.toFixed(2)))
    }

    return (
        <div className="p-6 pb-0">
            <div className="border-[rgba(255,255,255,0.5)] border text-white border-b-0">
                <div className="w-full flex border border-[rgba(255,255,255,0.5)] p-2 mb-4">
                    <div className="text-white flex-1">
                        <p className="text-right pr-20">Market Size</p>
                    </div>
                    <div className="text-white flex-1 justify-end">
                        <p>Price USD</p>
                    </div>
                </div>
                <div>
                    {topOffers
                        .slice()
                        .reverse()
                        .map((bid, index) => (
                            <div key={index} className="flex gap-1 mb-2">
                                <div className="flex-1">
                                    <p className="text-right pr-20">
                                        {bid.quantity}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-red-600">{bid.price}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="mt-4 border border-[rgba(255,255,255,0.5)] pt-4 border-l-0 border-r-0">
                    {topBids.map((bid, index) => (
                        <div key={index} className="flex gap-1 mb-2">
                            <div className="flex-1">
                                <p className="text-right pr-20">
                                    {bid.quantity}
                                </p>
                            </div>
                            <div className="flex-1">
                                <p className="text-green-500">{bid.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full flex p-2 mb-4 border border-[rgba(255,255,255,0.5)] border-l-0 border-r-0 relative justify-center">
                    <div
                        onClick={decrementAggregation}
                        className="mr-2 mt-2 mb-2 w-[30px] h-[30px] flex justify-center items-center border cursor-pointer border-[rgba(255,255,255,0.5)]"
                    >
                        -
                    </div>
                    <div className="text-white flex-1">
                        <p className="text-right pr-20 mt-2">Aggregation</p>
                    </div>
                    <div className="text-white flex-1 justify-end">
                        <p className="mt-2">{aggregation}</p>
                    </div>
                    <div
                        onClick={incrementAggregationHandler}
                        className="mr-2 mt-2 mb-2 w-[30px] h-[30px] flex justify-center items-center border cursor-pointer border-[rgba(255,255,255,0.5)]"
                    >
                        +
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderWidget
