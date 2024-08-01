import { useEffect, useState } from 'react';
import { products } from '../utils/utils';
import { IOrderBook } from '../utils/types';

export const useSocket = () => {
    const [orderBookData, setOrderBookData] = useState<IOrderBook[]>([]);
    const [selectedProduct, setSelectedProduct] = useState(products[0]);

    useEffect(() => {
        const ws = new WebSocket('wss://advanced-trade-ws.coinbase.com');
        const subscriptionMessage = JSON.stringify({
            type: 'subscribe',
            product_ids: [selectedProduct],
            channel: 'level2',
            jwt: process.env.COINBASE_JWT,
        });

        const handleOpen = () => {
            console.log('WebSocket connection open');
            ws.send(subscriptionMessage);
        };

        const handleMessage = (event: MessageEvent) => {
            const response = JSON.parse(event.data);
            if (response.events) {
                                    console.log('==> response.events', response.events[0].product_id)

                const newOrderBook = response.events
                    .filter((event: { product_id: string; updates: IOrderBook[] }) => event.product_id === selectedProduct)
                    .flatMap((event: { updates: IOrderBook[] }) => event.updates);

                if (newOrderBook.length > 0) {
                    setOrderBookData((prevOrderBook) => [...prevOrderBook, ...newOrderBook]);
                }
            }
        };

        const handleClose = (event: CloseEvent) => {
            console.log('WebSocket connection closed', event);
        };

        const handleError = (error: Event) => {
            console.error(`WebSocket error: ${error}`);
        };

        ws.addEventListener('open', handleOpen);
        ws.addEventListener('message', handleMessage);
        ws.addEventListener('close', handleClose);
        ws.addEventListener('error', handleError);

        // Cleanup function to close WebSocket connection
        return () => {
            console.log('Closing WebSocket connection');
            ws.removeEventListener('open', handleOpen);
            ws.removeEventListener('message', handleMessage);
            ws.removeEventListener('close', handleClose);
            ws.removeEventListener('error', handleError);
            ws.close();
        };
    }, [selectedProduct]);

    return {
        orderBookData,
        selectedProduct,
        setSelectedProduct,
    };
};