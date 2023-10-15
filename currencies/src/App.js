import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=95827b7ff7d84fd0b9e50915c42c3544"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.rates);
        const currencySearched = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"]; //used for defining which currency we want to check
        const currenciesKeyValue = currencySearched.map((key) => ({
          currency: key,
          rate: parseFloat(data.rates[key]).toFixed(6),
          weBuy: (parseFloat(data.rates[key]) * 1.05).toFixed(4), // 5% more
          weSell: (parseFloat(data.rates[key]) * 0.95).toFixed(4),
        }));
        setCurrency(currenciesKeyValue);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <table className="currency">
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currency.map((item) => (
            <tr key={item.currency}>
              <td>{item.currency}</td>
              <td>{item.weBuy}</td>
              <td>{item.rate}</td>
              <td>{item.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>
        Rates are based from 1 USD
        <br />
        This application uses API from{" "}
        <a href="https://currencyfreaks.com/">https://currencyfreaks.com/</a>
      </h1>
    </div>
  );
}

export default App;
