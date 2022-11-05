//
import React, { useEffect } from "react";
import { getUID } from "../utils/helpers.js";
import api from "../utils/api";
import { useStore } from '../stores/useStore'

function Quote() {
  
  const currentQuote = useStore((state) => state.currentQuote);
  const setcurrentQuote = useStore((state) => state.setcurrentQuote);
  const fetchQuote = () => {
    fetch(api.QUOTES_API)
      .then((response) => response.json())
      .then((data) => {
        setcurrentQuote({
          quote: data.quote,
          author: data.author,
          lastUpdated: getUID(),
        });
      })
      .catch((error) => {
        fetch("../data/quotes.json")
          .then((response) => response.json())
          .then((data) => {
            var item = data[Math.floor(Math.random() * data.length)];
            setcurrentQuote({
              quote: item.quote,
              author: item.author,
              lastUpdated: getUID(),
            });
          });
      });
  };

  useEffect(() => {
    if (
      currentQuote.lastUpdated == null ||
      currentQuote.lastUpdated !== getUID()
    ) {
      fetchQuote();
    }
    // eslint-disable-next-line
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
