import './App.css';

import { useEffect, useState } from 'react';

function App() {
  const [quote, setQuote] = useState(undefined);

  function fetchQuote() {
    setQuote(undefined);
    fetch("https://quote-server-kitt.onrender.com/quotes/random")
      .then((resp) => resp.json())
      .then((data) => {
        setQuote(data);
      });
  }

  useEffect(() => {
    fetchQuote();
  }, [])

  let content = "Loading...";
  if (quote) {
    content = <div>
      <div>
        <h2>{quote.quote}</h2>
        {`-\"${quote.author}`}
      </div>
      <button onClick={fetchQuote}>Fetch new quote</button>
    </div>
  }

  return (
    <div>
      {content}
    </div>
  );
}

export default App;
