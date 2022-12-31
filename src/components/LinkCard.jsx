import React from "react";
import { useQuickLinks } from "../stores/useQuickLinks";

export default function LinkCard() {
  const MAX_ITEMS_FOR_THREE_COL = 6;
  const quickLinks = useQuickLinks((state) => state.quickLinks);
  return (
    <ul
      className={`quick-links ${
        quickLinks.filter((x) => x.visible && x.url).length <=
        MAX_ITEMS_FOR_THREE_COL
          ? "quick-links--three-col"
          : ""
      }`}
    >
      {quickLinks.map((item) => {
        return (
          item.url &&
          item.visible && (
            <li className="quick-links__item" key={item.id}>
              <a
                href={
                  item.url.indexOf("://") === -1
                    ? "https://" + item.url
                    : item.url
                }
                {...(!item.self && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {!item.self && (
                  <span className="link-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </span>
                )}
                {item.title || item.url.replace(/^https?:\/\//i, "")}
              </a>
            </li>
          )
        );
      })}
    </ul>
  );
}
