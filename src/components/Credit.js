import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Quote from "./Quote.js";

function Credit() {
  const [backgroundImage] = useLocalStorage("stratus-background", []);
  return (
    <>
          {Object.keys(backgroundImage).length > 0 && (
            <div className="footer__image-info">
              <a
                href={backgroundImage.image.links.html}
                target="_blank"
                rel="noopener noreferrer"
              >
                Photo
              </a>{" "}
              by{" "}
              <a
                href={backgroundImage.image.user.links.html}
                target="_blank"
                rel="noopener noreferrer"
              >
                {backgroundImage.image.user.name}
              </a>
            </div>
          )}
    </>
  );
}

export default Credit;
