import React, { Suspense, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getUID } from "../utils/helpers.js";
import wretch from "wretch";

function Image() {
  const [
    backgroundImage,
    setBackgroundImage,
  ] = useLocalStorage("stratus-background", []);

  function getImage() {
    var API_KEY =
      "b26f90cbe29ca389bf76ad3176e29bda81ef9fc80e6792ce828664660ca3afdc";
    var API_URL = `https://api.unsplash.com`;
    var collection = `${API_URL}/collections/26321157/photos?client_id=${API_KEY}`;
    wretch(collection)
      .get()
      .json((json) => {
        var item = json[Math.floor(Math.random() * json.length)];

        console.log(item.urls.full);

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
         <img src={backgroundImage.image.urls.full} />
     </figure>
    )}
    </>
  );
}

export default Image;
