import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getUID } from "../utils/helpers.js";
import wretch from "wretch";

function Image() {
  const [backgroundImage, setBackgroundImage] = useLocalStorage(
    "stratus-background",
    []
  );

  function getImage() {
    var collection = `https://stratus-server.onrender.com/api/background`;
    wretch(collection)
      .get()
      .json((json) => {
        var item = json[Math.floor(Math.random() * json.length)];

        setBackgroundImage({
          image: item,
          lastUpdated: getUID(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (
      backgroundImage.lastUpdated == null ||
      backgroundImage.lastUpdated !== getUID()
    ) {
      getImage();
    }
  });
  return (
    <>
      {Object.keys(backgroundImage).length > 0 && (
        <figure className="app-background">
          <img src={backgroundImage.image.urls.full} alt="" />
        </figure>
      )}
    </>
  );
}

export default Image;
