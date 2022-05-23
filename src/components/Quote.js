//
import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getUID } from "../utils/helpers.js";
import wretch from "wretch";

const QUOTE_API = `https://stratus-server.onrender.com/api/quote`;

function Quote() {
  const fetchQuote = () => {
    wretch(QUOTE_API)
      .get()
      .json((json) => {
        setcurrentQuote({
          quote: json.quote,
          author: json.author,
          lastUpdated: getUID(),
        });
      })
      .catch((error) => {});
  };

  const [currentQuote, setcurrentQuote] = useLocalStorage("stratus-quote", []);
  useEffect(() => {
    if (
      currentQuote.lastUpdated == null ||
      currentQuote.lastUpdated !== getUID()
    ) {
      fetchQuote();
    }
  }, []);
  return (
    <>
      {Object.keys(currentQuote).length > 0 && (
        <figure className="quote">
          <blockquote className="quote__content">
            <p>{currentQuote.quote}</p>
          </blockquote>
          <figcaption className="quote__author">
            {currentQuote.author}
          </figcaption>
        </figure>
      )}
    </>
  );
}

export default Quote;
