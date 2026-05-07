import React, { useState } from "react";
import { useStore } from "../stores/useStore";

const ENGINES = [
  { id: "duckduckgo", name: "DuckDuckGo", url: "https://duckduckgo.com/?q=" },
  { id: "google", name: "Google", url: "https://www.google.com/search?q=" },
  { id: "bing", name: "Bing", url: "https://www.bing.com/search?q=" },
  { id: "ecosia", name: "Ecosia", url: "https://www.ecosia.org/search?q=" },
  { id: "yahoo", name: "Yahoo", url: "https://search.yahoo.com/search?p=" },
  { id: "qwant", name: "Qwant", url: "https://www.qwant.com/?q=" },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedEngine = useStore((state) => state.selectedSearchEngine);
  const setSelectedEngine = useStore((state) => state.setSelectedSearchEngine);

  const currentEngine =
    ENGINES.find((e) => e.id === selectedEngine) || ENGINES[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = currentEngine.url + encodeURIComponent(query.trim());
  };

  return (
    <div className="search-widget">
      <form
        onSubmit={handleSubmit}
        className="styled-input search-widget__form"
      >
        <input
          type="text"
          className="styled-input__input styled-input__input--front"
          name="search"
          placeholder={`Search the web with ${currentEngine.name}`}
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className="styled-input__label" htmlFor="search">
          <span className="sr-only">
            Search the web with {currentEngine.name}
          </span>
        </label>
        <button
          title="Search"
          type="submit"
          className="styled-input__reset styled-input__reset--front"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <button
          title="Change search engine"
          type="button"
          className={`styled-input__reset search-widget__toggle ${
            dropdownOpen ? "search-widget__toggle--active" : ""
          }`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </form>
      {dropdownOpen && (
        <div className="search-widget__dropdown">
          {ENGINES.map((engine) => (
            <label
              key={engine.id}
              className={`search-widget__option ${
                selectedEngine === engine.id
                  ? "search-widget__option--selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="search-engine"
                value={engine.id}
                checked={selectedEngine === engine.id}
                onChange={() => {
                  setSelectedEngine(engine.id);
                  setDropdownOpen(false);
                }}
                className="search-widget__radio"
              />
              <span className="search-widget__radio-custom" />
              <span>{engine.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
