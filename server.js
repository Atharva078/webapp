// server.js
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.get('/api/stock/:symbol', (req, res) => {
  const stocks = JSON.parse(fs.readFileSync('stocksData.json'));
  const stock = stocks.find(s => s.symbol === req.params.symbol);

  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }

  res.json({ symbol: stock.symbol, currentPrice: stock.currentPrice });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
