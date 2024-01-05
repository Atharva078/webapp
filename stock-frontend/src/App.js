// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const apiKey = 'qty8OmxzlM8BFuEpV5fRNUp2nJQp23Pd';
  const apiUrl = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2022-01-01/2023-01-09';

  const fetchStocks = async (n) => {
    try {
      const response = await axios.get(`${apiUrl}?apiKey=${apiKey}`);
      const fetchedStocks = response.data.results.slice(0, n);
      setStocks(fetchedStocks);

      const intervalId = setInterval(async () => {
        try {
          const updatedStocks = await axios.get(`${apiUrl}?apiKey=${apiKey}`);
          setStocks(updatedStocks.data.results.slice(0, n));
        } catch (error) {
          console.error('Error updating stock prices:', error.message);
        }
      }, 3000);

      return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    } catch (error) {
      console.error('Error fetching stocks:', error.message);
    }
  };

  useEffect(() => {
    const n = prompt('Enter the number of stocks (not more than 20):');
    if (n && n <= 21) {
      fetchStocks(n);
    } else {
      console.error('Invalid input. Please enter a number not more than 20.');
    }
  }, []);

  return (
    <div>
      <h1>Stock Prices</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.t}>
            {stock.v}: ${stock.c}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
