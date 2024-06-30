# COINROUTES
This React project displays real-time order book data, including bids and offers (asks), using WebSocket and visualizes it in a graph.

## Features

- A widget showing the top bidder and offeror.
- Line graph displaying the relationship between bids and offers, plotted against price and time.
- A widget that compares the top 10 bidders and offers in a ladder view format.
- For the top 10 bidders and offeros, it also provides price aggregation by consolidating quantities for similar prices.
- **Note**:
  - Top 10 bids is ranked by the highest prices.
  - The top 10 offers (asks) are ranked by the lowest prices.

## Data Source

Data is sourced from the [Coinbase Advanced Trading API](https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#level2-channel).


## Installation
- Create a .env file.
- Add COINBASE_JWT to the .env file.
- Run the following commands:
```bash
npm install
npm start
```