// fetchStocks.js
const axios = require('axios');
const fs = require('fs');

const apiKey = 'qty8OmxzlM8BFuEpV5fRNUp2nJQp23Pd';
const apiUrl = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09';
const dataFilePath = 'stocksData.json';

console.log('called')

const fetchStocks = async () => {
  try {
    const response = await axios.get(`${apiUrl}?apiKey=${apiKey}&limit=20`);
    console.log('response', response.data);
    const stocks = response.data.tickers.map(ticker => ({
      symbol: ticker.ticker,
      openPrice: ticker.day.open,
      refreshInterval: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
      currentPrice: ticker.day.open, // Initial value
    }));
//
    fs.writeFileSync(dataFilePath, JSON.stringify(stocks));
    console.log('Stock data fetched and stored.');
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
  }
};

fetchStocks();
