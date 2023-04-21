const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define a route for the root of our API
app.get('/', (req, res) => {
  res.send(`
    <form action="/" method="POST">
      <label for="coin">Enter a coin name:</label>
      <input type="text" id="coin" name="coin">
      <button type="submit">Get price</button>
    </form>
  `);
});

// define a route for handling POST requests
app.post('/', async (req, res) => {
  const coin = req.body.coin;
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
    const price = response.data[coin.toLowerCase()].usd;
    res.send(`The current price of ${coin} is $${price}`);
  } catch (error) {
    res.status(400).send('Coin not found');
  }
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
