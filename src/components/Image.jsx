import React, { useEffect, useState } from "react";
import { getUID } from "../utils/helpers.js";
import api from "../utils/api";
import { useStore } from "../stores/useStore";
import { useSettings } from "../stores/useSettings";

function Image() {
  const backgroundImage = useStore((state) => state.backgroundImage);
  const setBackgroundImage = useStore((state) => state.setBackgroundImage);
  const settings = useSettings((state) => state.config);

  const [loading, setLoading] = useState(false);
  const getImage = () => {
    setLoading(true);
    const selectedCollection = settings.backgroundCollections.find(
      (c) => c.id === settings.selectedCollection
    );
    const collectionId = selectedCollection && selectedCollection.collectionId;

    let apiUrl = api.BACKGROUND_API;
    if (collectionId) {
      // Try to use server API with collection parameter
      apiUrl = `${api.BACKGROUND_API}?collection=${collectionId}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        let item;
        if (Array.isArray(data)) {
          // Server API returns array
          item = data[Math.floor(Math.random() * data.length)];
        } else {
          // Unsplash random returns single object
          item = data;
        }
        setBackgroundImage({
          image: item,
          lastUpdated: getUID(),
          collectionId: collectionId || null,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch from API, using fallback:", error);
        // Fallback to local images
        fetch("../data/images.json")
          .then((response) => response.json())
          .then((data) => {
            var item = data[Math.floor(Math.random() * data.length)];
            setBackgroundImage({
              image: item,
              lastUpdated: getUID(),
              collectionId: collectionId || null,
            });
            setLoading(false);
          })
          .catch((fallbackError) => {
            console.log("Fallback also failed:", fallbackError);
            setLoading(false);
          });
      });
  };
  const resizeImage = (imageURL) => {
    if (typeof imageURL !== "undefined") {
      return imageURL.replace(/&w=(\d+)/, "&w=2000");
    } else {
      return imageURL;
    }
  };

  useEffect(() => {
    const currentCollectionId =
      settings.backgroundCollections.find(
        (c) => c.id === settings.selectedCollection
      )?.collectionId || null;
    if (
      backgroundImage.lastUpdated == null ||
      backgroundImage.length === 0 ||
      backgroundImage.lastUpdated !== getUID() ||
      backgroundImage.collectionId !== currentCollectionId
    ) {
      getImage();
    }
    // eslint-disable-next-line
  }, [settings.selectedCollection]);
  return (
    <>
      {Object.keys(backgroundImage).length > 0 && (
        <figure
          className={`app-background ${
            loading ? "app-background--is-loading" : ""
          }`}
        >
          <img
            src={resizeImage(backgroundImage.image.urls.regular)}
            alt=""
            onLoad={() => setLoading(false)}
          />
        </figure>
      )}
    </>
  );
}

export default Image;
