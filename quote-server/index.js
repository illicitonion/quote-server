const express = require("express");
const app = express()
var cors = require('cors')
app.use(cors());

const quotes = [
  {
    "quote": "If you're not prepared to be wrong, you'll never come up with anything original.",
    "author": "Ken Robinson",
  },
  {
    "quote": "I believe that if, at the end of it all, according to our abilities, we have done something to make others a little happier, and something to make ourselves a little happier, that is about the best we can do. To make others less happy is a crime. To make ourselves unhappy is where all crime starts.",
    "author": "Roger Ebert",
  }
];

app.get('/', (req, res) => {
  res.send('Hello')
});

app.get("/quotes", (request, response) => {
  const count = request.query.count;
  const responseData = quotes
    .slice(0, count)
    .map(quoteObject => {
      if (request.query.only !== undefined) {
        return quoteObject[request.query.only];
      } else {
        return quoteObject;
      }
    });
  response.send(responseData);
});

app.get("/quotes/random", (request, response) => {
  response.send(quotes[Math.floor(Math.random() * quotes.length)])
});

app.get("/quotes/search", (request, response) => {
  let term = (request.query.term || "").toLowerCase();
  response.send(quotes.filter(q => q.quote.toLowerCase().includes(term) || q.author.toLowerCase().includes(term)));
});

const port = process.env.PORT || 9090;
console.log(`Listening on port ${port}`)
app.listen(port);
