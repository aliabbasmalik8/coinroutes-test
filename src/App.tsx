import React, { useEffect } from 'react'
import LineChart from './components/LineChart'
import { useSocket } from './hooks/useSocket'
import LeaderWidget from './components/LeaderWidget'
import BestBitDetail from './components/BestBitDetail'
import Dropdown from './components/DropDown'
import { useOrderBook } from './hooks/useOrderBook'
import { products } from './utils/utils'

const App = () => {
    const { selectedProduct, setSelectedProduct, orderBookData } = useSocket()
    const { bestBid, bestOffer, bids, offers, setOrderBookData } =
        useOrderBook()
    useEffect(() => {
        setOrderBookData(orderBookData)
    }, [orderBookData])
    return (
        <div className="bg-black min-h-[100vh] p-6">
            <div className="flex items-center gap-2 mb-6">
                <Dropdown
                    options={products}
                    onChange={(val) => setSelectedProduct(val)}
                    selectedValue={selectedProduct}
                />
            </div>
            <BestBitDetail bestBid={bestBid} bestOffer={bestOffer} />
            <div className="flex">
                <LineChart orderBookData={orderBookData} />
            </div>
            <LeaderWidget bids={bids} offers={offers} data={orderBookData} />
        </div>
    )
}

export default App
