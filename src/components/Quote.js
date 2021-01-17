//
import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getUID } from "../utils/helpers.js";
import wretch from "wretch";

function Quote() {
  const QUOTE_API = `https://quotes.rest/qod?language=en`;
  const fetchQuote = () => {
    wretch(QUOTE_API)
      .get()
      .json((json) => {
        setcurrentQuote({
          quote: json.contents.quotes[0].quote,
          author: json.contents.quotes[0].author,
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
      console.log("it was a new day: " + getUID());
      fetchQuote();
    } else {
      console.log("it was a an old day" + getUID());
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
