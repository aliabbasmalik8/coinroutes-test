export const products = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD']

export const filterAndSortData = (
    data: { price: number; quantity: number }[],
    ascending = true
) => {
    return data.sort((a, b) => {
        if (a.price === b.price) {
            return ascending ? a.quantity - b.quantity : b.quantity - a.quantity
        }
        return ascending ? a.price - b.price : b.price - a.price
    })
}
export const priceFormate = (price: number) => {
    if (price >= 1000000) {
        return (price / 1000000).toFixed(1) + 'm'
    } else if (price >= 1000) {
        return (price / 1000).toFixed(1) + 'k'
    }
    return price.toString()
}

export const aggregateData = (
    data: { price: number; quantity: number }[],
    aggregation: number
) => {
    const aggregatedBids = data.map((bid) => {
        const roundedPrice = Math.floor(bid.price / aggregation) * aggregation
        return { price: roundedPrice, quantity: bid.quantity }
    })

    const combinedData: { [key: string]: number } = {}
    aggregatedBids.forEach((entry) => {
        const price = entry.price
        const quantity = entry.quantity
        if (combinedData[price]) {
            combinedData[price] += quantity
        } else {
            combinedData[price] = quantity
        }
    })
    const result = Object.keys(combinedData).map((price) => {
        return { price: Number(price), quantity: combinedData[price] }
    })
    return result
}
