import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getUID } from "../utils/helpers.js";
import api from "../utils/api";

function Image() {
  const [backgroundImage, setBackgroundImage] = useLocalStorage(
    "stratus-background",
    []
  );
  const [image, setImage] = useLocalStorage("stratus-image", false);

  function getImage() {
    fetch(api.BACKGROUND_API)
      .then((response) => response.json())
      .then((data) => {
        var item = data[Math.floor(Math.random() * data.length)];

        setBackgroundImage({
          image: item,
          lastUpdated: getUID(),
        });
      })
      .catch((error) => {
        fetch("../data/images.json")
          .then((response) => response.json())
          .then((data) => {
            var item = data[Math.floor(Math.random() * data.length)];
            setBackgroundImage({
              image: item,
              lastUpdated: getUID(),
            });
          });
      });
  }

  const fetchImage = async (imageUrl) => {
    if (!image) {
      fetch(imageUrl)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        )
        .then((data) => setImage(data));
    }
  };

  useEffect(() => {
    if (
      backgroundImage.lastUpdated == null ||
      backgroundImage.lastUpdated !== getUID()
    ) {
      getImage();
    } else {
      if (Object.keys(backgroundImage).length > 0) {
        fetchImage(backgroundImage.image.urls.full);
      }
    }
  });
  return (
    <>
      {image && (
        <figure className="app-background fade-in">
          <img src={image} alt="" />
        </figure>
      )}
    </>
  );
}

export default Image;
