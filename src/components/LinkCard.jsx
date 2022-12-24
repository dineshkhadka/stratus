import React from "react";
import { useQuickLinks } from "../stores/useQuickLinks";

export default function LinkCard() {
  const quickLinks = useQuickLinks((state) => state.quickLinks);
  return (
    <ul className="quick-links">
      {quickLinks.map((item) => {
        return (
          (item.url || item.title) &&
          item.visible && (
            <li className="quick-links__item" key={item.id}>
              <a
                href={item.url}
                {...(item.self && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {item.title || item.url}
              </a>
            </li>
          )
        );
      })}
    </ul>
  );
}
