// updateStockPrices.js
const fs = require('fs');

const updateStockPrices = () => {
  setInterval(() => {
    const stocks = JSON.parse(fs.readFileSync('stocksData.json'));
    stocks.forEach(stock => {
      stock.currentPrice = stock.openPrice + (Math.random() - 0.5) * 2; // Random price change
    });

    fs.writeFileSync('stocksData.json', JSON.stringify(stocks));
    console.log('Stock prices updated.');
  }, 1000);
};

updateStockPrices();
