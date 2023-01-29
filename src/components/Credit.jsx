import React from "react";
import { useStore } from "../stores/useStore";

function Credit() {
  const backgroundImage = useStore((state) => state.backgroundImage);
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
            className="footer__author"
          >
            {backgroundImage.image.user.name.toLowerCase()}
          </a>
        </div>
      )}
    </>
  );
}

export default Credit;
