import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function Footer() {
  const [backgroundImage] = useLocalStorage("stratus-background", []);
  return (
    <>
      {Object.keys(backgroundImage).length > 0 && (
        <footer className="footer">
          <div className="footer__inner">

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
        </footer>
      )}
    </>
  );
}

export default Footer;
