import React, { useEffect } from "react";
import { getUID } from "../utils/helpers.js";
import api from "../utils/api";
import { useStore } from '../stores/useStore'

function Image() {
  const backgroundImage = useStore((state) => state.backgroundImage);
  const setBackgroundImage = useStore((state) => state.setBackgroundImage);

  const getImage = () => {
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
        <figure className="app-background fade-in">
          <img src={backgroundImage.image.urls.full} alt="" />
        </figure>
      )}
    </>
  );
}

export default Image;
