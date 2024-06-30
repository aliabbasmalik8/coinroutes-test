import React, { FC, useEffect, useState } from 'react'
import {
    LineChart as ReactLineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from 'recharts'
import { IOrderBook, OrderBookParticipant } from '../utils/types'
import { priceFormate } from '../utils/utils'

export interface ILineChartProps {
    orderBookData: IOrderBook[]
}
interface IGraphData {
    offer: number
    bid: number
    time: string
}
const LineChart: FC<ILineChartProps> = ({ orderBookData }) => {
    const [graphData, setGraphData] = useState<IGraphData[]>([])
    useEffect(() => {
        const OrderBookDataByTime: {
            [key: string]: { offer: number; bid: number }
        } = {}
        orderBookData.map((orderBook) => {
            if (!orderBook) return orderBook
            const orderBookPrice = Number(orderBook.price_level)
            const time = new Date(orderBook.event_time)
            const [hour, minutes, seconds] = [
                time.getHours(),
                time.getMinutes(),
                time.getSeconds(),
            ]
            const formatedTime = `${hour}:${minutes}:${seconds}`
            if (!OrderBookDataByTime[formatedTime]) {
                OrderBookDataByTime[formatedTime] = { offer: 0, bid: 0 }
            }
            if (orderBook.side === OrderBookParticipant.BIDDER) {
                OrderBookDataByTime[formatedTime] = {
                    ...OrderBookDataByTime[formatedTime],
                    bid: orderBookPrice,
                }
            } else if (orderBook.side === OrderBookParticipant.OFFEROR) {
                OrderBookDataByTime[formatedTime] = {
                    ...OrderBookDataByTime[formatedTime],
                    offer: orderBookPrice,
                }
            }
            return orderBook
        })
        const newGraphData: IGraphData[] = []
        Object.keys(OrderBookDataByTime).map((key) => {
            const prices = OrderBookDataByTime[key]
            newGraphData.push({
                time: key,
                ...prices,
            })
            return key
        })
        setGraphData(newGraphData)
    }, [orderBookData])

    return (
        <div className="linechart">
            <ReactLineChart
                width={1200}
                height={600}
                data={graphData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="1" />
                <XAxis dataKey="time" accumulate="sum" />
                <YAxis
                    type="number"
                    tickFormatter={(value) => priceFormate(Number(value))}
                    allowDecimals={true}
                />
                <Tooltip />
                <Legend />
                <Line dataKey="offer" stroke="#FF0000" />
                <Line dataKey="bid" stroke="#008000" />
            </ReactLineChart>
        </div>
    )
}
export default LineChart
