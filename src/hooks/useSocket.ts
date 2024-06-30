import { useEffect, useState } from 'react'
import { products } from '../utils/utils'
import { IOrderBook } from '../utils/types'
export const useSocket = () => {
    const [orderBookData, setOrderBookData] = useState<IOrderBook[]>([])
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [selectedProduct, setSelectedProduct] = useState(products[0])
    useEffect(() => {
        if (socket) {
            socket.close()
            setOrderBookData([])
        }
        const subscriptionMessage = JSON.stringify({
            type: 'subscribe',
            product_ids: [selectedProduct],
            channel: 'level2',
            jwt: process.env.COINBASE_JWT,
        })
        const ws = new WebSocket('wss://advanced-trade-ws.coinbase.com')
        ws.onopen = () => {
            console.log('websocket connection open')
            ws.send(subscriptionMessage)
        }
        ws.onmessage = (event: MessageEvent) => {
            let newOrderBook: IOrderBook[] = []
            const response = JSON.parse(event.data)
            if (response.events) {
                response.events.map((event: { updates: IOrderBook[] }) => {
                    newOrderBook = newOrderBook.concat(event.updates)
                    return event
                })
            }
            if (newOrderBook.length > 0) {
                setOrderBookData((prevOrderBook) => [
                    ...prevOrderBook,
                    ...newOrderBook,
                ])
            }
        }
        ws.onclose = () => {
            console.log('WebSocket connection closed')
        }
        ws.onerror = (error) => {
            console.error(`WebSocket error: ${error}`)
        }
        setSocket(ws)
    }, [selectedProduct])
    return {
        orderBookData,
        selectedProduct,
        setSelectedProduct,
        setSocket,
        socket,
    }
}
